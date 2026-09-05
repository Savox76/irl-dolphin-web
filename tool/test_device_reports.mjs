import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";

import { buildVerifiedDevices } from "./build_verified_devices.mjs";
import {
  hasMatchingVerification,
  parseDeviceReportIssue,
  verificationMarkerFor,
} from "./device_report.mjs";

const requiredTestCaseIds = [testCaseId(4500), testCaseId(12000)];

const completeReport = reportWith({
  runs: [guidedRun(1, 4500), guidedRun(2, 12000)],
  completedTestCaseIds: requiredTestCaseIds,
  status: "complete",
});

const valid = parseDeviceReportIssue(issueBody(completeReport));
assert.equal(valid.ok, true);
assert.equal(
  parseDeviceReportIssue(issueBody(completeReport).replaceAll("\n", "\r\n"))
    .ok,
  true,
);
assert.equal(valid.summary.deviceModel, "Huawei test device");
assert.equal(valid.summary.completedRunCount, 2);
assert.deepEqual(valid.summary.qualificationPlan, {
  id: "media.hardware-h264.guided",
  version: 1,
  status: "complete",
  requiredTestCaseCount: 2,
  completedTestCaseCount: 2,
  missingTestCaseIds: [],
});
assert.deepEqual(valid.summary.highestProfile, {
  width: 1920,
  height: 1080,
  framesPerSecond: 60,
  requestedBitrateKbps: 12000,
  effectiveFramesPerSecond: 59.6,
  effectiveBitrateKbps: 11520,
});

const allProfiles = [
  captureProfile(1280, 720, 30, [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000]),
  captureProfile(1280, 720, 60, [2000, 2500, 3000, 4000, 5000, 6000]),
  captureProfile(1920, 1080, 30, [2500, 3000, 3500, 4500, 6000, 8000]),
  captureProfile(1920, 1080, 60, [4500, 6000, 8000, 9000, 10000, 12000]),
];
const allCases = [
  [1280, 720, 30, 1000],
  [1280, 720, 30, 2000],
  [1280, 720, 30, 6000],
  [1280, 720, 60, 2000],
  [1280, 720, 60, 6000],
  [1920, 1080, 30, 2500],
  [1920, 1080, 30, 4500],
  [1920, 1080, 30, 8000],
  [1920, 1080, 60, 4500],
  [1920, 1080, 60, 12000],
];
const allCaseIds = allCases.map(([width, height, framesPerSecond, bitrateKbps]) =>
  testCaseId(bitrateKbps, { width, height, framesPerSecond }),
);
const fullPlanReport = reportWith({
  profiles: allProfiles,
  runs: allCases.map(
    ([width, height, framesPerSecond, bitrateKbps], index) =>
      guidedRun(index + 1, bitrateKbps, "guidedPlan", {
        width,
        height,
        framesPerSecond,
      }),
  ),
  requiredIds: allCaseIds,
  completedTestCaseIds: allCaseIds,
  status: "complete",
});
const fullPlan = parseDeviceReportIssue(issueBody(fullPlanReport));
assert.equal(fullPlan.ok, true);
assert.equal(fullPlan.summary.qualificationPlan.requiredTestCaseCount, 10);
assert.equal(fullPlan.summary.qualificationPlan.completedTestCaseCount, 10);

const partialReport = reportWith({
  runs: [guidedRun(1, 4500)],
  completedTestCaseIds: [testCaseId(4500)],
  status: "partial",
});
const partial = parseDeviceReportIssue(issueBody(partialReport));
assert.equal(partial.ok, true);
assert.equal(partial.summary.qualificationPlan.status, "partial");
assert.deepEqual(partial.summary.qualificationPlan.missingTestCaseIds, [
  testCaseId(12000),
]);

const manualReport = reportWith({
  runs: [guidedRun(1, 4500, "manualProfile")],
  completedTestCaseIds: [],
  status: "partial",
});
assert.equal(parseDeviceReportIssue(issueBody(manualReport)).ok, true);

const falseComplete = structuredClone(manualReport);
falseComplete.testPlan.completedTestCaseIds = requiredTestCaseIds;
falseComplete.testPlan.status = "complete";
const falseCompleteResult = parseDeviceReportIssue(issueBody(falseComplete));
assert.equal(falseCompleteResult.ok, false);
assert.match(falseCompleteResult.errors.join("\n"), /completedTestCaseIds/u);

const wrongPlan = structuredClone(completeReport);
wrongPlan.testPlan.requiredTestCaseIds.pop();
const wrongPlanResult = parseDeviceReportIssue(issueBody(wrongPlan));
assert.equal(wrongPlanResult.ok, false);
assert.match(wrongPlanResult.errors.join("\n"), /requiredTestCaseIds/u);

const wrongTest = structuredClone(completeReport);
wrongTest.runs[0].testCaseId = "media.hardware-h264.unknown";
const wrongTestResult = parseDeviceReportIssue(issueBody(wrongTest));
assert.equal(wrongTestResult.ok, false);
assert.match(wrongTestResult.errors.join("\n"), /testCaseId/u);

const extraField = structuredClone(completeReport);
extraField.ownerEmail = "must-not-be-accepted@example.com";
const extraFieldResult = parseDeviceReportIssue(issueBody(extraField));
assert.equal(extraFieldResult.ok, false);
assert.match(extraFieldResult.errors.join("\n"), /unsupported fields/u);

const legacyReport = structuredClone(manualReport);
legacyReport.schemaVersion = 1;
delete legacyReport.testPlan;
const legacy = parseDeviceReportIssue(issueBody(legacyReport));
assert.equal(legacy.ok, true);
assert.equal(legacy.summary.qualificationPlan.status, "legacy");

const tamperedBody = issueBody(completeReport).replace("sha256: ", "sha256: a");
assert.equal(parseDeviceReportIssue(tamperedBody).ok, false);

const marker = verificationMarkerFor(valid.reportSha256);
assert.equal(
  hasMatchingVerification(
    [{ user: { login: "github-actions[bot]" }, body: marker }],
    valid.reportSha256,
  ),
  true,
);
assert.equal(
  hasMatchingVerification(
    [{ user: { login: "another-user" }, body: marker }],
    valid.reportSha256,
  ),
  false,
);

const verifiedIssue = verifiedIssueFor(12, completeReport, marker);
const verifiedDevices = await buildVerifiedDevices({
  repository: "Savox76/irl-dolphin-web",
  issues: [verifiedIssue],
  now: new Date("2026-09-05T01:00:00.000Z"),
});
assert.equal(verifiedDevices.devices.length, 1);
assert.equal(verifiedDevices.devices[0].sourceIssue.number, 12);
assert.deepEqual(
  verifiedDevices.devices[0].localMediaMeasurement.qualificationPlan,
  {
    id: "media.hardware-h264.guided",
    version: 1,
    completedTestCases: 2,
    requiredTestCases: 2,
  },
);
assert.equal(
  verifiedDevices.devices[0].localMediaMeasurement.highestConfirmedProfile
    .framesPerSecond,
  60,
);

const partialMarker = verificationMarkerFor(partial.reportSha256);
const partialDevices = await buildVerifiedDevices({
  repository: "Savox76/irl-dolphin-web",
  issues: [verifiedIssueFor(13, partialReport, partialMarker)],
});
assert.equal(partialDevices.devices.length, 0);

const legacyMarker = verificationMarkerFor(legacy.reportSha256);
const legacyDevices = await buildVerifiedDevices({
  repository: "Savox76/irl-dolphin-web",
  issues: [verifiedIssueFor(14, legacyReport, legacyMarker)],
});
assert.equal(legacyDevices.devices.length, 0);

const editedReport = structuredClone(completeReport);
editedReport.generatedAtUtc = "2026-09-05T01:30:00.000Z";
const staleApprovalDevices = await buildVerifiedDevices({
  repository: "Savox76/irl-dolphin-web",
  issues: [{ ...verifiedIssue, body: issueBody(editedReport) }],
});
assert.equal(staleApprovalDevices.devices.length, 0);

console.log("IRL Dolphin device-report validation passed.");

function reportWith({
  runs,
  completedTestCaseIds,
  status,
  profiles,
  requiredIds = requiredTestCaseIds,
}) {
  return {
    reportType: "irl-dolphin-device-qualification",
    schemaVersion: 2,
    generatedAtUtc: "2026-09-05T00:30:00.000Z",
    build: {
      commit: "40b17f1a7360317c41005e6835e56af3e33533db",
      qualityRun: "219",
    },
    scope: {
      cameraToHardwareH264Only: true,
      networkTested: false,
      streamingServiceTested: false,
      containsMedia: false,
      containsCredentials: false,
      containsStableDeviceIdentifiers: false,
    },
    supportedCaptureProfiles:
      profiles ??
      [captureProfile(1920, 1080, 60, [4500, 6000, 8000, 9000, 10000, 12000])],
    testPlan: {
      id: "media.hardware-h264.guided",
      version: 1,
      requiredTestCaseIds: requiredIds,
      completedTestCaseIds,
      status,
    },
    runs,
  };
}

function guidedRun(
  runNumber,
  bitrateKbps,
  testScenario = "guidedPlan",
  profile = { width: 1920, height: 1080, framesPerSecond: 60 },
) {
  return {
    runId: `run-${String(runNumber).padStart(3, "0")}`,
    testCaseId: testCaseId(bitrateKbps, profile),
    testModule: "media.hardwareH264",
    testScenario,
    recordedAtUtc: `2026-09-05T00:${String(runNumber).padStart(2, "0")}:00.000Z`,
    request: {
      durationMs: 5000,
      width: profile.width,
      height: profile.height,
      framesPerSecond: profile.framesPerSecond,
      bitrateKbps,
    },
    result: {
      outcome: "completed",
      durationMs: 5000,
      startupLatencyMs: 180,
      capturedFrames: profile.framesPerSecond * 5,
      encodedFrames: profile.framesPerSecond * 5 - 2,
      frameDelta: 2,
      encodedBytes: bitrateKbps * 625,
      effectiveFramesPerSecond: profile.framesPerSecond - 0.4,
      effectiveBitrateKbps: bitrateKbps * 0.96,
      encoderFailures: 0,
      thermalStateBefore: "nominal",
      thermalStateAfter: "fair",
      environment: {
        platform: "android",
        deviceModel: "Huawei test device",
        osVersion: "Android 16 (API 36)",
        appVersion: "0.1.0-alpha.3",
        encoderName: "c2.vendor.avc.encoder",
        cameraFacing: "rear",
      },
    },
  };
}

function testCaseId(
  bitrateKbps,
  profile = { width: 1920, height: 1080, framesPerSecond: 60 },
) {
  return (
    `media.hardware-h264.${profile.width}x${profile.height}` +
    `.${profile.framesPerSecond}fps.${bitrateKbps}kbps.5000ms`
  );
}

function captureProfile(width, height, framesPerSecond, bitrateOptionsKbps) {
  return { width, height, framesPerSecond, bitrateOptionsKbps };
}

function verifiedIssueFor(number, report, reportMarker) {
  return {
    number,
    html_url: `https://github.com/Savox76/irl-dolphin-web/issues/${number}`,
    body: issueBody(report),
    labels: [{ name: "device-report-valid" }, { name: "device-verified" }],
    fixtureComments: [
      {
        user: { login: "github-actions[bot]" },
        body: reportMarker,
        created_at: "2026-09-05T01:00:00.000Z",
      },
    ],
  };
}

function issueBody(value) {
  const bytes = Buffer.from(JSON.stringify(value, null, 2), "utf8");
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  const payload = gzipSync(bytes).toString("base64url");
  return `## Device report

<!-- IRL_DOLPHIN_QUALIFICATION_REPORT_V1
encoding: gzip+base64url
sha256: ${sha256}
payload: ${payload}
-->`;
}
