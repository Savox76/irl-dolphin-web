import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  parseDeviceReportIssue,
  verificationMarkerFor,
} from "./device_report.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(root, "website/verified-devices.json");

export async function buildVerifiedDevices({
  repository,
  token,
  issues: suppliedIssues,
  loadComments: suppliedCommentLoader,
  now = new Date(),
}) {
  const issues =
    suppliedIssues ??
    (await fetchPages(
      `https://api.github.com/repos/${repository}/issues?state=all&labels=device-verified&per_page=100`,
      token,
    ));
  const loadComments =
    suppliedCommentLoader ??
    ((issue) => fetchPages(issue.comments_url + "?per_page=100", token));
  const byCompatibilityProfile = new Map();

  for (const issue of issues) {
    if (issue.pull_request || !hasLabel(issue, "device-report-valid") || !hasLabel(issue, "device-verified")) {
      continue;
    }
    const parsed = parseDeviceReportIssue(issue.body);
    if (!parsed.ok || !parsed.summary.deviceModel || !parsed.summary.highestProfile) {
      continue;
    }
    const comments = issue.fixtureComments ?? (await loadComments(issue));
    const marker = verificationMarkerFor(parsed.reportSha256);
    const verification = comments
      .filter(
        (comment) =>
          comment?.user?.login === "github-actions[bot]" &&
          typeof comment.body === "string" &&
          comment.body.includes(marker),
      )
      .sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at))[0];
    if (!verification) continue;

    const summary = parsed.summary;
    const profileKey = [
      summary.platform,
      summary.deviceModel.toLocaleLowerCase("en"),
      summary.osVersion.toLocaleLowerCase("en"),
    ].join("\u0000");
    const entry = {
      compatibilityProfileId: createHash("sha256").update(profileKey).digest("hex").slice(0, 16),
      deviceModel: summary.deviceModel,
      platform: summary.platform,
      osVersion: summary.osVersion,
      appVersion: summary.appVersion,
      verifiedAtUtc: verification.created_at,
      sourceIssue: {
        number: issue.number,
        url: issue.html_url,
      },
      build: summary.build,
      localMediaMeasurement: {
        successfulRuns: summary.completedRunCount,
        stoppedRuns: summary.stoppedRunCount,
        failedRuns: summary.failedRunCount,
        encoders: summary.encoders,
        highestConfirmedProfile: summary.highestProfile,
      },
      limitations: ["networkNotTested", "streamingServiceNotTested"],
    };
    const previous = byCompatibilityProfile.get(profileKey);
    if (!previous || Date.parse(entry.verifiedAtUtc) > Date.parse(previous.verifiedAtUtc)) {
      byCompatibilityProfile.set(profileKey, entry);
    }
  }

  return {
    schemaVersion: 1,
    generatedAtUtc: now.toISOString(),
    devices: [...byCompatibilityProfile.values()].sort((left, right) =>
      left.deviceModel.localeCompare(right.deviceModel, "en"),
    ),
  };
}

async function main() {
  const fixtureArgument = process.argv.indexOf("--issues-file");
  const fixturePath =
    fixtureArgument >= 0 ? process.argv[fixtureArgument + 1] : null;
  const fixture = fixturePath
    ? JSON.parse(readFileSync(resolve(process.cwd(), fixturePath), "utf8"))
    : null;
  const repository = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  if (!fixture && (!repository || !token)) {
    throw new Error("GITHUB_REPOSITORY and GITHUB_TOKEN are required.");
  }

  const output = await buildVerifiedDevices({
    repository,
    token,
    issues: fixture?.issues,
    loadComments: fixture ? async (issue) => issue.fixtureComments ?? [] : undefined,
  });
  writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8");
  console.log(`Built ${output.devices.length} verified device profile(s).`);
}

async function fetchPages(initialUrl, token) {
  const values = [];
  let nextUrl = initialUrl;
  for (let page = 0; nextUrl && page < 10; page += 1) {
    const response = await fetch(nextUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}.`);
    }
    values.push(...(await response.json()));
    nextUrl = nextLink(response.headers.get("link"));
  }
  return values;
}

function nextLink(linkHeader) {
  if (!linkHeader) return null;
  for (const part of linkHeader.split(",")) {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/u);
    if (match?.[2] === "next") return match[1];
  }
  return null;
}

function hasLabel(issue, name) {
  return issue.labels?.some((label) => (typeof label === "string" ? label : label.name) === name);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
