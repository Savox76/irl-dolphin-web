import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";

export const reportMarker = "IRL_DOLPHIN_QUALIFICATION_REPORT_V1";
export const verifiedMarker = "IRL_DOLPHIN_VERIFIED_REPORT_V1";

const maximumIssueBodyLength = 30_000;
const maximumCompressedBytes = 12_000;
const maximumReportBytes = 64_000;
const maximumRuns = 24;

const bitrateOptions = new Map([
  ["1280x720@30", [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000]],
  ["1280x720@60", [2000, 2500, 3000, 4000, 5000, 6000]],
  ["1920x1080@30", [2500, 3000, 3500, 4500, 6000, 8000]],
  ["1920x1080@60", [4500, 6000, 8000, 9000, 10000, 12000]],
]);

const failureKinds = [
  "unsupportedPlatform",
  "permissionDenied",
  "busy",
  "nativeUnavailable",
  "invalidPayload",
];
const thermalStates = ["nominal", "fair", "serious", "critical", "unavailable"];
const cameraFacings = ["front", "rear", "external", "unknown"];

export function parseDeviceReportIssue(body) {
  const errors = [];
  if (typeof body !== "string" || body.length > maximumIssueBodyLength) {
    return invalid("Issue body is missing or exceeds the public-report limit.");
  }

  const markerPattern = new RegExp(
    `<!-- ${reportMarker}\\r?\\nencoding: gzip\\+base64url\\r?\\nsha256: ([a-f0-9]{64})\\r?\\npayload: ([A-Za-z0-9_-]+)\\r?\\n-->`,
    "g",
  );
  const matches = [...body.matchAll(markerPattern)];
  if (matches.length !== 1) {
    return invalid("Expected exactly one IRL Dolphin qualification envelope.");
  }

  const expectedSha256 = matches[0][1];
  const encodedPayload = matches[0][2];
  let compressed;
  try {
    compressed = Buffer.from(encodedPayload, "base64url");
  } catch {
    return invalid("The qualification payload is not valid base64url.");
  }
  if (!compressed.length || compressed.length > maximumCompressedBytes) {
    return invalid("The compressed qualification payload is outside its size limit.");
  }

  let reportBytes;
  try {
    reportBytes = gunzipSync(compressed, { maxOutputLength: maximumReportBytes });
  } catch {
    return invalid("The qualification payload is not valid bounded gzip data.");
  }
  if (!reportBytes.length || reportBytes.length > maximumReportBytes) {
    return invalid("The qualification report is outside its size limit.");
  }

  const actualSha256 = createHash("sha256").update(reportBytes).digest("hex");
  if (actualSha256 !== expectedSha256) {
    return invalid("The qualification report checksum does not match.");
  }

  let report;
  try {
    report = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(reportBytes));
  } catch {
    return invalid("The qualification report is not valid UTF-8 JSON.");
  }

  validateReport(report, errors);
  if (errors.length) {
    return {
      ok: false,
      errors,
      report: null,
      reportSha256: actualSha256,
      summary: null,
    };
  }

  return {
    ok: true,
    errors: [],
    report,
    reportSha256: actualSha256,
    summary: summarizeReport(report),
  };
}

export function verificationMarkerFor(reportSha256) {
  return `<!-- ${verifiedMarker} sha256=${reportSha256} -->`;
}

export function hasMatchingVerification(comments, reportSha256) {
  const marker = verificationMarkerFor(reportSha256);
  return comments.some(
    (comment) =>
      comment?.user?.login === "github-actions[bot]" &&
      typeof comment.body === "string" &&
      comment.body.includes(marker),
  );
}

function validateReport(report, errors) {
  if (
    !exactKeys(
      report,
      [
        "reportType",
        "schemaVersion",
        "generatedAtUtc",
        "build",
        "scope",
        "supportedCaptureProfiles",
        "runs",
      ],
      "report",
      errors,
    )
  ) {
    return;
  }

  equal(report.reportType, "irl-dolphin-device-qualification", "report.reportType", errors);
  equal(report.schemaVersion, 1, "report.schemaVersion", errors);
  isoDate(report.generatedAtUtc, "report.generatedAtUtc", errors);

  if (exactKeys(report.build, ["commit", "qualityRun"], "report.build", errors)) {
    pattern(report.build.commit, /^[0-9a-f]{40}$/, "report.build.commit", errors);
    pattern(report.build.qualityRun, /^[1-9][0-9]{0,9}$/, "report.build.qualityRun", errors);
  }

  if (
    exactKeys(
      report.scope,
      [
        "cameraToHardwareH264Only",
        "networkTested",
        "streamingServiceTested",
        "containsMedia",
        "containsCredentials",
        "containsStableDeviceIdentifiers",
      ],
      "report.scope",
      errors,
    )
  ) {
    equal(report.scope.cameraToHardwareH264Only, true, "report.scope.cameraToHardwareH264Only", errors);
    for (const key of [
      "networkTested",
      "streamingServiceTested",
      "containsMedia",
      "containsCredentials",
      "containsStableDeviceIdentifiers",
    ]) {
      equal(report.scope[key], false, `report.scope.${key}`, errors);
    }
  }

  validateProfiles(report.supportedCaptureProfiles, errors);
  validateRuns(report.runs, errors);
}

function validateProfiles(profiles, errors) {
  if (!Array.isArray(profiles) || profiles.length < 1 || profiles.length > 4) {
    add(errors, "report.supportedCaptureProfiles must contain one to four profiles.");
    return;
  }
  const seen = new Set();
  profiles.forEach((profile, index) => {
    const path = `report.supportedCaptureProfiles[${index}]`;
    if (
      !exactKeys(
        profile,
        ["width", "height", "framesPerSecond", "bitrateOptionsKbps"],
        path,
        errors,
      )
    ) {
      return;
    }
    const key = profileKey(profile);
    const expectedOptions = bitrateOptions.get(key);
    if (!expectedOptions || seen.has(key)) {
      add(errors, `${path} is unsupported or duplicated.`);
      return;
    }
    seen.add(key);
    if (
      !Array.isArray(profile.bitrateOptionsKbps) ||
      profile.bitrateOptionsKbps.length !== expectedOptions.length ||
      profile.bitrateOptionsKbps.some((value, optionIndex) => value !== expectedOptions[optionIndex])
    ) {
      add(errors, `${path}.bitrateOptionsKbps does not match the bounded profile.`);
    }
  });
}

function validateRuns(runs, errors) {
  if (!Array.isArray(runs) || runs.length < 1 || runs.length > maximumRuns) {
    add(errors, `report.runs must contain one to ${maximumRuns} runs.`);
    return;
  }

  runs.forEach((run, index) => {
    const path = `report.runs[${index}]`;
    if (!isRecord(run)) {
      add(errors, `${path} must be an object.`);
      return;
    }
    const hasResult = Object.hasOwn(run, "result");
    const hasFailure = Object.hasOwn(run, "failure");
    const expectedKeys = [
      "runId",
      "testCaseId",
      "testModule",
      "testScenario",
      "recordedAtUtc",
      "request",
      hasResult ? "result" : "failure",
    ];
    if (hasResult === hasFailure || !exactKeys(run, expectedKeys, path, errors)) {
      if (hasResult === hasFailure) {
        add(errors, `${path} must contain exactly one result or failure.`);
      }
      return;
    }

    equal(run.runId, `run-${String(index + 1).padStart(3, "0")}`, `${path}.runId`, errors);
    equal(run.testModule, "media.hardwareH264", `${path}.testModule`, errors);
    equal(run.testScenario, "manualProfile", `${path}.testScenario`, errors);
    isoDate(run.recordedAtUtc, `${path}.recordedAtUtc`, errors);
    validateRequest(run.request, `${path}.request`, errors);
    if (isRecord(run.request)) {
      equal(run.testCaseId, testCaseId(run.request), `${path}.testCaseId`, errors);
    }
    if (hasResult) {
      validateResult(run.result, `${path}.result`, errors);
    } else {
      oneOf(run.failure, failureKinds, `${path}.failure`, errors);
    }
  });
}

function validateRequest(request, path, errors) {
  if (
    !exactKeys(
      request,
      ["durationMs", "width", "height", "framesPerSecond", "bitrateKbps"],
      path,
      errors,
    )
  ) {
    return;
  }
  equal(request.durationMs, 5000, `${path}.durationMs`, errors);
  const options = bitrateOptions.get(profileKey(request));
  if (!options || !options.includes(request.bitrateKbps)) {
    add(errors, `${path} is not a supported resolution, frame-rate and bitrate combination.`);
  }
}

function validateResult(result, path, errors) {
  if (
    !exactKeys(
      result,
      [
        "outcome",
        "durationMs",
        "startupLatencyMs",
        "capturedFrames",
        "encodedFrames",
        "frameDelta",
        "encodedBytes",
        "effectiveFramesPerSecond",
        "effectiveBitrateKbps",
        "encoderFailures",
        "thermalStateBefore",
        "thermalStateAfter",
        "environment",
      ],
      path,
      errors,
    )
  ) {
    return;
  }
  oneOf(result.outcome, ["completed", "stopped"], `${path}.outcome`, errors);
  integer(result.durationMs, 0, 11_000, `${path}.durationMs`, errors);
  integer(result.startupLatencyMs, 0, 11_000, `${path}.startupLatencyMs`, errors);
  integer(result.capturedFrames, 0, 1000, `${path}.capturedFrames`, errors);
  integer(result.encodedFrames, 0, 1000, `${path}.encodedFrames`, errors);
  integer(result.frameDelta, -1000, 1000, `${path}.frameDelta`, errors);
  if (
    Number.isInteger(result.capturedFrames) &&
    Number.isInteger(result.encodedFrames) &&
    result.frameDelta !== result.capturedFrames - result.encodedFrames
  ) {
    add(errors, `${path}.frameDelta does not match the frame counters.`);
  }
  integer(result.encodedBytes, 0, 100_000_000, `${path}.encodedBytes`, errors);
  finite(result.effectiveFramesPerSecond, 0, 240, `${path}.effectiveFramesPerSecond`, errors);
  finite(result.effectiveBitrateKbps, 0, 40_000, `${path}.effectiveBitrateKbps`, errors);
  integer(result.encoderFailures, 0, 100, `${path}.encoderFailures`, errors);
  oneOf(result.thermalStateBefore, thermalStates, `${path}.thermalStateBefore`, errors);
  oneOf(result.thermalStateAfter, thermalStates, `${path}.thermalStateAfter`, errors);
  validateEnvironment(result.environment, `${path}.environment`, errors);
}

function validateEnvironment(environment, path, errors) {
  if (
    !exactKeys(
      environment,
      ["platform", "deviceModel", "osVersion", "appVersion", "encoderName", "cameraFacing"],
      path,
      errors,
    )
  ) {
    return;
  }
  oneOf(environment.platform, ["android", "ios"], `${path}.platform`, errors);
  text(environment.deviceModel, 128, `${path}.deviceModel`, errors);
  text(environment.osVersion, 96, `${path}.osVersion`, errors);
  text(environment.appVersion, 64, `${path}.appVersion`, errors);
  text(environment.encoderName, 128, `${path}.encoderName`, errors);
  oneOf(environment.cameraFacing, cameraFacings, `${path}.cameraFacing`, errors);
}

function summarizeReport(report) {
  const resultRuns = report.runs.filter((run) => run.result);
  const completedRuns = resultRuns.filter((run) => run.result.outcome === "completed");
  const highest = [...completedRuns].sort((left, right) => {
    const leftScore =
      left.request.width * left.request.height * left.request.framesPerSecond * left.request.bitrateKbps;
    const rightScore =
      right.request.width * right.request.height * right.request.framesPerSecond * right.request.bitrateKbps;
    return rightScore - leftScore;
  })[0];
  const environment = resultRuns.at(-1)?.result.environment ?? null;
  return {
    generatedAtUtc: report.generatedAtUtc,
    build: report.build,
    deviceModel: environment?.deviceModel ?? null,
    platform: environment?.platform ?? null,
    osVersion: environment?.osVersion ?? null,
    appVersion: environment?.appVersion ?? null,
    encoders: [...new Set(resultRuns.map((run) => run.result.environment.encoderName))].sort(),
    runCount: report.runs.length,
    completedRunCount: completedRuns.length,
    stoppedRunCount: resultRuns.length - completedRuns.length,
    failedRunCount: report.runs.length - resultRuns.length,
    highestProfile: highest
      ? {
          width: highest.request.width,
          height: highest.request.height,
          framesPerSecond: highest.request.framesPerSecond,
          requestedBitrateKbps: highest.request.bitrateKbps,
          effectiveFramesPerSecond: highest.result.effectiveFramesPerSecond,
          effectiveBitrateKbps: highest.result.effectiveBitrateKbps,
        }
      : null,
  };
}

function testCaseId(request) {
  return (
    `media.hardware-h264.${request.width}x${request.height}` +
    `.${request.framesPerSecond}fps.${request.bitrateKbps}kbps.${request.durationMs}ms`
  );
}

function profileKey(profile) {
  return `${profile?.width}x${profile?.height}@${profile?.framesPerSecond}`;
}

function exactKeys(value, expectedKeys, path, errors) {
  if (!isRecord(value)) {
    add(errors, `${path} must be an object.`);
    return false;
  }
  const actualKeys = Object.keys(value).sort();
  const expected = [...expectedKeys].sort();
  if (
    actualKeys.length !== expected.length ||
    actualKeys.some((key, index) => key !== expected[index])
  ) {
    add(errors, `${path} contains missing or unsupported fields.`);
    return false;
  }
  return true;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function equal(actual, expected, path, errors) {
  if (actual !== expected) add(errors, `${path} must equal ${JSON.stringify(expected)}.`);
}

function pattern(value, expression, path, errors) {
  if (typeof value !== "string" || !expression.test(value)) {
    add(errors, `${path} has an invalid format.`);
  }
}

function text(value, maximumLength, path, errors) {
  if (
    typeof value !== "string" ||
    value.trim() !== value ||
    !value.length ||
    value.length > maximumLength ||
    /[\u0000-\u001f\u007f]/u.test(value)
  ) {
    add(errors, `${path} is not valid bounded text.`);
  }
}

function isoDate(value, path, errors) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(?:\d{3})?Z$/u.test(value) ||
    Number.isNaN(Date.parse(value))
  ) {
    add(errors, `${path} is not a UTC ISO-8601 timestamp.`);
  }
}

function integer(value, minimum, maximum, path, errors) {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    add(errors, `${path} is outside its integer bounds.`);
  }
}

function finite(value, minimum, maximum, path, errors) {
  if (!Number.isFinite(value) || value < minimum || value > maximum) {
    add(errors, `${path} is outside its numeric bounds.`);
  }
}

function oneOf(value, values, path, errors) {
  if (!values.includes(value)) add(errors, `${path} contains an unsupported value.`);
}

function add(errors, message) {
  if (errors.length < 40) errors.push(message);
}

function invalid(message) {
  return {
    ok: false,
    errors: [message],
    report: null,
    reportSha256: null,
    summary: null,
  };
}
