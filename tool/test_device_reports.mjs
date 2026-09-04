import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";

import { buildVerifiedDevices } from "./build_verified_devices.mjs";
import {
  hasMatchingVerification,
  parseDeviceReportIssue,
  verificationMarkerFor,
} from "./device_report.mjs";

const report = {
  reportType: "irl-dolphin-device-qualification",
  schemaVersion: 1,
  generatedAtUtc: "2026-09-04T19:00:00.000Z",
  build: {
    commit: "06af1a468922e9262649abbe187150f0bb305c06",
    qualityRun: "213",
  },
  scope: {
    cameraToHardwareH264Only: true,
    networkTested: false,
    streamingServiceTested: false,
    containsMedia: false,
    containsCredentials: false,
    containsStableDeviceIdentifiers: false,
  },
  supportedCaptureProfiles: [
    {
      width: 1920,
      height: 1080,
      framesPerSecond: 60,
      bitrateOptionsKbps: [4500, 6000, 8000, 9000, 10000, 12000],
    },
  ],
  runs: [
    {
      runId: "run-001",
      testCaseId: "media.hardware-h264.1920x1080.60fps.9000kbps.5000ms",
      testModule: "media.hardwareH264",
      testScenario: "manualProfile",
      recordedAtUtc: "2026-09-04T18:58:00.123456Z",
      request: {
        durationMs: 5000,
        width: 1920,
        height: 1080,
        framesPerSecond: 60,
        bitrateKbps: 9000,
      },
      result: {
        outcome: "completed",
        durationMs: 5000,
        startupLatencyMs: 180,
        capturedFrames: 301,
        encodedFrames: 298,
        frameDelta: 3,
        encodedBytes: 5_400_000,
        effectiveFramesPerSecond: 59.6,
        effectiveBitrateKbps: 8640,
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
    },
  ],
};

const valid = parseDeviceReportIssue(issueBody(report));
assert.equal(valid.ok, true);
assert.equal(parseDeviceReportIssue(issueBody(report).replaceAll("\n", "\r\n")).ok, true);
assert.equal(valid.summary.deviceModel, "Huawei test device");
assert.equal(valid.summary.completedRunCount, 1);
assert.deepEqual(valid.summary.highestProfile, {
  width: 1920,
  height: 1080,
  framesPerSecond: 60,
  requestedBitrateKbps: 9000,
  effectiveFramesPerSecond: 59.6,
  effectiveBitrateKbps: 8640,
});

const wrongTest = structuredClone(report);
wrongTest.runs[0].testCaseId = "media.hardware-h264.unknown";
const wrongTestResult = parseDeviceReportIssue(issueBody(wrongTest));
assert.equal(wrongTestResult.ok, false);
assert.match(wrongTestResult.errors.join("\n"), /testCaseId/u);

const extraField = structuredClone(report);
extraField.ownerEmail = "must-not-be-accepted@example.com";
const extraFieldResult = parseDeviceReportIssue(issueBody(extraField));
assert.equal(extraFieldResult.ok, false);
assert.match(extraFieldResult.errors.join("\n"), /unsupported fields/u);

const tamperedBody = issueBody(report).replace("sha256: ", "sha256: a");
const tamperedResult = parseDeviceReportIssue(tamperedBody);
assert.equal(tamperedResult.ok, false);

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

const verifiedIssue = {
  number: 12,
  html_url: "https://github.com/Savox76/irl-dolphin-web/issues/12",
  body: issueBody(report),
  labels: [{ name: "device-report-valid" }, { name: "device-verified" }],
  fixtureComments: [
    {
      user: { login: "github-actions[bot]" },
      body: marker,
      created_at: "2026-09-04T20:00:00.000Z",
    },
  ],
};
const verifiedDevices = await buildVerifiedDevices({
  repository: "Savox76/irl-dolphin-web",
  issues: [verifiedIssue],
  now: new Date("2026-09-04T21:00:00.000Z"),
});
assert.equal(verifiedDevices.devices.length, 1);
assert.equal(verifiedDevices.devices[0].sourceIssue.number, 12);
assert.equal(
  verifiedDevices.devices[0].localMediaMeasurement.highestConfirmedProfile.framesPerSecond,
  60,
);

const editedReport = structuredClone(report);
editedReport.generatedAtUtc = "2026-09-04T20:30:00.000Z";
const staleApprovalDevices = await buildVerifiedDevices({
  repository: "Savox76/irl-dolphin-web",
  issues: [{ ...verifiedIssue, body: issueBody(editedReport) }],
});
assert.equal(staleApprovalDevices.devices.length, 0);

console.log("IRL Dolphin device-report validation passed.");

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
