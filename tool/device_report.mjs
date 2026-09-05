import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";

export const reportMarker = "IRL_DOLPHIN_QUALIFICATION_REPORT_V1";
export const verifiedMarker = "IRL_DOLPHIN_VERIFIED_REPORT_V1";

const maximumIssueBodyLength = 30_000;
const maximumCompressedBytes = 12_000;
const maximumReportBytes = 64_000;
const maximumRuns = 24;
const guidedPlanId = "media.hardware-h264.guided";
const currentSchemaVersion = 3;
const currentGuidedPlanVersion = 2;
const legacyGuidedPlanVersion = 1;
const legacyMeasurementDurationMs = 5_000;
const currentMeasurementDurationMs = 15_000;
const maximumResultDurationMs = 16_500;
const maximumStartupLatencyMs = 10_000;
const minimumFrameRateRatio = 0.9;
const minimumBitrateRatio = 0.7;
const maximumBitrateRatio = 1.3;
const maximumFrameDeltaRatio = 0.02;
const maximumStartupLatencyForQualificationMs = 5_000;

const qualityFailureKinds = [
  "outcomeNotCompleted",
  "durationOutsideTolerance",
  "frameRateBelowThreshold",
  "bitrateBelowThreshold",
  "bitrateAboveThreshold",
  "frameDeltaAboveThreshold",
  "encoderFailures",
  "startupLatencyAboveThreshold",
  "thermalPressure",
];

const bitrateOptions = new Map([
  ["1280x720@30", [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000]],
  ["1280x720@60", [2000, 2500, 3000, 4000, 5000, 6000]],
  ["1920x1080@30", [2500, 3000, 3500, 4500, 6000, 8000]],
  ["1920x1080@60", [4500, 6000, 8000, 9000, 10000, 12000]],
]);
const defaultBitrates = new Map([
  ["1280x720", 2000],
  ["1920x1080", 4500],
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
  if (!isRecord(report)) {
    add(errors, "report must be an object.");
    return;
  }
  const schemaVersion = report.schemaVersion;
  if (![1, 2, currentSchemaVersion].includes(schemaVersion)) {
    add(errors, "report.schemaVersion must equal 1, 2 or 3.");
    return;
  }
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
        ...(schemaVersion >= 2 ? ["testPlan"] : []),
        "runs",
      ],
      "report",
      errors,
    )
  ) {
    return;
  }

  equal(report.reportType, "irl-dolphin-device-qualification", "report.reportType", errors);
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
  validateRuns(report.runs, schemaVersion, errors);
  if (schemaVersion >= 2) {
    validateTestPlan(
      report.testPlan,
      report.supportedCaptureProfiles,
      report.runs,
      schemaVersion,
      errors,
    );
  }
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

function validateRuns(runs, schemaVersion, errors) {
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
    oneOf(
      run.testScenario,
      schemaVersion === 1 ? ["manualProfile"] : ["manualProfile", "guidedPlan"],
      `${path}.testScenario`,
      errors,
    );
    isoDate(run.recordedAtUtc, `${path}.recordedAtUtc`, errors);
    validateRequest(run.request, schemaVersion, `${path}.request`, errors);
    if (isRecord(run.request)) {
      equal(run.testCaseId, testCaseId(run.request), `${path}.testCaseId`, errors);
    }
    if (hasResult) {
      validateResult(run.result, run.request, schemaVersion, `${path}.result`, errors);
    } else {
      oneOf(run.failure, failureKinds, `${path}.failure`, errors);
    }
  });
}

function validateTestPlan(plan, profiles, runs, schemaVersion, errors) {
  if (
    !exactKeys(
      plan,
      ["id", "version", "requiredTestCaseIds", "completedTestCaseIds", "status"],
      "report.testPlan",
      errors,
    )
  ) {
    return;
  }
  equal(plan.id, guidedPlanId, "report.testPlan.id", errors);
  equal(
    plan.version,
    schemaVersion === currentSchemaVersion
      ? currentGuidedPlanVersion
      : legacyGuidedPlanVersion,
    "report.testPlan.version",
    errors,
  );

  const expectedRequired = requiredGuidedTestCaseIds(
    profiles,
    measurementDurationFor(schemaVersion),
  );
  stringArray(plan.requiredTestCaseIds, 1, 12, "report.testPlan.requiredTestCaseIds", errors);
  if (!sameArray(plan.requiredTestCaseIds, expectedRequired)) {
    add(errors, "report.testPlan.requiredTestCaseIds does not match the supported profiles.");
  }

  const requiredSet = new Set(expectedRequired);
  const actualCompletedSet = new Set(
    Array.isArray(runs)
      ? runs
          .filter(
            (run) =>
              isRecord(run) &&
              run.testScenario === "guidedPlan" &&
              isRecord(run.result) &&
              run.result.outcome === "completed" &&
              (schemaVersion !== currentSchemaVersion ||
                run.result.quality?.status === "pass") &&
              requiredSet.has(run.testCaseId),
          )
          .map((run) => run.testCaseId)
      : [],
  );
  const expectedCompleted = expectedRequired.filter((testCaseId) =>
    actualCompletedSet.has(testCaseId),
  );
  stringArray(
    plan.completedTestCaseIds,
    0,
    expectedRequired.length,
    "report.testPlan.completedTestCaseIds",
    errors,
  );
  if (!sameArray(plan.completedTestCaseIds, expectedCompleted)) {
    add(errors, "report.testPlan.completedTestCaseIds does not match completed guided runs.");
  }
  const expectedStatus =
    expectedCompleted.length === expectedRequired.length ? "complete" : "partial";
  equal(plan.status, expectedStatus, "report.testPlan.status", errors);

  if (Array.isArray(runs)) {
    runs.forEach((run, index) => {
      if (
        isRecord(run) &&
        run.testScenario === "guidedPlan" &&
        !requiredSet.has(run.testCaseId)
      ) {
        add(
          errors,
          `report.runs[${index}].testCaseId is not part of the guided plan.`,
        );
      }
    });
  }
}

function validateRequest(request, schemaVersion, path, errors) {
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
  equal(
    request.durationMs,
    measurementDurationFor(schemaVersion),
    `${path}.durationMs`,
    errors,
  );
  const options = bitrateOptions.get(profileKey(request));
  if (!options || !options.includes(request.bitrateKbps)) {
    add(errors, `${path} is not a supported resolution, frame-rate and bitrate combination.`);
  }
}

function validateResult(result, request, schemaVersion, path, errors) {
  const current = schemaVersion === currentSchemaVersion;
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
        ...(current ? ["bitrateMode", "measurementWindow", "quality"] : []),
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
  integer(
    result.durationMs,
    0,
    current ? maximumResultDurationMs : 11_000,
    `${path}.durationMs`,
    errors,
  );
  integer(
    result.startupLatencyMs,
    0,
    current ? maximumStartupLatencyMs : 11_000,
    `${path}.startupLatencyMs`,
    errors,
  );
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
  if (current) {
    oneOf(result.bitrateMode, ["constant", "average"], `${path}.bitrateMode`, errors);
    equal(result.measurementWindow, "postStartup", `${path}.measurementWindow`, errors);
    validateReportedRates(result, path, errors);
    validateQuality(result.quality, request, result, `${path}.quality`, errors);
  }
  integer(result.encoderFailures, 0, 100, `${path}.encoderFailures`, errors);
  oneOf(result.thermalStateBefore, thermalStates, `${path}.thermalStateBefore`, errors);
  oneOf(result.thermalStateAfter, thermalStates, `${path}.thermalStateAfter`, errors);
  validateEnvironment(result.environment, `${path}.environment`, errors);
  if (current && isRecord(result.environment)) {
    if (result.environment.platform === "android") {
      equal(result.bitrateMode, "constant", `${path}.bitrateMode`, errors);
    } else if (result.environment.platform === "ios") {
      equal(result.bitrateMode, "average", `${path}.bitrateMode`, errors);
    }
  }
}

function validateReportedRates(result, path, errors) {
  if (
    !Number.isInteger(result.durationMs) ||
    result.durationMs <= 0 ||
    !Number.isInteger(result.encodedFrames) ||
    !Number.isInteger(result.encodedBytes) ||
    !Number.isFinite(result.effectiveFramesPerSecond) ||
    !Number.isFinite(result.effectiveBitrateKbps)
  ) {
    return;
  }
  const expectedFramesPerSecond = round2(
    (result.encodedFrames * 1_000) / result.durationMs,
  );
  const expectedBitrateKbps = round2(
    (result.encodedBytes * 8) / result.durationMs,
  );
  if (Math.abs(result.effectiveFramesPerSecond - expectedFramesPerSecond) > 0.02) {
    add(errors, `${path}.effectiveFramesPerSecond does not match the counters.`);
  }
  if (Math.abs(result.effectiveBitrateKbps - expectedBitrateKbps) > 0.02) {
    add(errors, `${path}.effectiveBitrateKbps does not match the counters.`);
  }
}

function validateQuality(quality, request, result, path, errors) {
  if (!exactKeys(quality, ["status", "failureReasons"], path, errors)) return;
  oneOf(quality.status, ["pass", "fail"], `${path}.status`, errors);
  stringArray(
    quality.failureReasons,
    0,
    qualityFailureKinds.length,
    `${path}.failureReasons`,
    errors,
  );
  if (
    Array.isArray(quality.failureReasons) &&
    quality.failureReasons.some((reason) => !qualityFailureKinds.includes(reason))
  ) {
    add(errors, `${path}.failureReasons contains an unsupported value.`);
  }
  const expectedReasons = qualificationFailureReasons(request, result);
  if (!sameArray(quality.failureReasons, expectedReasons)) {
    add(errors, `${path}.failureReasons does not match the measured values.`);
  }
  equal(
    quality.status,
    expectedReasons.length === 0 ? "pass" : "fail",
    `${path}.status`,
    errors,
  );
}

function qualificationFailureReasons(request, result) {
  if (!isRecord(request) || !isRecord(result)) return [];
  const reasons = [];
  if (result.outcome !== "completed") reasons.push("outcomeNotCompleted");
  if (
    !Number.isInteger(result.durationMs) ||
    Math.abs(result.durationMs - request.durationMs) > 1_000
  ) {
    reasons.push("durationOutsideTolerance");
  }
  if (
    !Number.isFinite(result.effectiveFramesPerSecond) ||
    result.effectiveFramesPerSecond < request.framesPerSecond * minimumFrameRateRatio
  ) {
    reasons.push("frameRateBelowThreshold");
  }
  if (
    !Number.isFinite(result.effectiveBitrateKbps) ||
    result.effectiveBitrateKbps < request.bitrateKbps * minimumBitrateRatio
  ) {
    reasons.push("bitrateBelowThreshold");
  }
  if (
    Number.isFinite(result.effectiveBitrateKbps) &&
    result.effectiveBitrateKbps > request.bitrateKbps * maximumBitrateRatio
  ) {
    reasons.push("bitrateAboveThreshold");
  }
  const maximumFrameDelta = Number.isInteger(result.capturedFrames)
    ? Math.max(2, Math.ceil(result.capturedFrames * maximumFrameDeltaRatio))
    : 2;
  if (
    !Number.isInteger(result.frameDelta) ||
    Math.abs(result.frameDelta) > maximumFrameDelta
  ) {
    reasons.push("frameDeltaAboveThreshold");
  }
  if (result.encoderFailures !== 0) reasons.push("encoderFailures");
  if (
    !Number.isInteger(result.startupLatencyMs) ||
    result.startupLatencyMs > maximumStartupLatencyForQualificationMs
  ) {
    reasons.push("startupLatencyAboveThreshold");
  }
  if (["serious", "critical"].includes(result.thermalStateAfter)) {
    reasons.push("thermalPressure");
  }
  return reasons;
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
  const qualifiedRuns =
    report.schemaVersion === currentSchemaVersion
      ? completedRuns.filter((run) => run.result.quality?.status === "pass")
      : [];
  const profileCandidates =
    report.schemaVersion === currentSchemaVersion ? qualifiedRuns : completedRuns;
  const highest = [...profileCandidates].sort((left, right) => {
    const leftScore =
      left.request.width * left.request.height * left.request.framesPerSecond * left.request.bitrateKbps;
    const rightScore =
      right.request.width * right.request.height * right.request.framesPerSecond * right.request.bitrateKbps;
    return rightScore - leftScore;
  })[0];
  const environment = resultRuns.at(-1)?.result.environment ?? null;
  const requiredTestCaseIds = report.testPlan?.requiredTestCaseIds ?? [];
  const completedTestCaseIds = report.testPlan?.completedTestCaseIds ?? [];
  const qualityFailedTestCaseIds =
    report.schemaVersion === currentSchemaVersion
      ? [
          ...new Set(
            report.runs
              .filter(
                (run) =>
                  run.testScenario === "guidedPlan" &&
                  run.result?.outcome === "completed" &&
                  run.result.quality?.status === "fail" &&
                  !completedTestCaseIds.includes(run.testCaseId),
              )
              .map((run) => run.testCaseId),
          ),
        ]
      : [];
  return {
    schemaVersion: report.schemaVersion,
    generatedAtUtc: report.generatedAtUtc,
    build: report.build,
    deviceModel: environment?.deviceModel ?? null,
    platform: environment?.platform ?? null,
    osVersion: environment?.osVersion ?? null,
    appVersion: environment?.appVersion ?? null,
    encoders: [...new Set(resultRuns.map((run) => run.result.environment.encoderName))].sort(),
    runCount: report.runs.length,
    completedRunCount: completedRuns.length,
    qualifiedRunCount: qualifiedRuns.length,
    stoppedRunCount: resultRuns.length - completedRuns.length,
    failedRunCount: report.runs.length - resultRuns.length,
    qualificationPlan:
      report.schemaVersion === currentSchemaVersion
        ? {
            id: report.testPlan.id,
            version: report.testPlan.version,
            status: report.testPlan.status,
            requiredTestCaseCount: requiredTestCaseIds.length,
            completedTestCaseCount: completedTestCaseIds.length,
            missingTestCaseIds: requiredTestCaseIds.filter(
              (testCaseId) => !completedTestCaseIds.includes(testCaseId),
            ),
            qualityFailedTestCaseIds,
          }
        : report.schemaVersion === 2
          ? {
              id: report.testPlan.id,
              version: report.testPlan.version,
              status: "retest",
              requiredTestCaseCount: requiredTestCaseIds.length,
              completedTestCaseCount: 0,
              missingTestCaseIds: requiredTestCaseIds,
              qualityFailedTestCaseIds: [],
            }
        : {
            id: null,
            version: null,
            status: "legacy",
            requiredTestCaseCount: 0,
            completedTestCaseCount: 0,
            missingTestCaseIds: [],
            qualityFailedTestCaseIds: [],
          },
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

function requiredGuidedTestCaseIds(profiles, durationMs) {
  if (!Array.isArray(profiles)) return [];
  return profiles.flatMap((profile) => {
    const options = bitrateOptions.get(profileKey(profile));
    if (!options) return [];
    const defaultBitrate = defaultBitrates.get(`${profile.width}x${profile.height}`);
    const selected = [...new Set([options[0], defaultBitrate, options.at(-1)])].filter(
      (value) => options.includes(value),
    );
    return selected.map((bitrateKbps) =>
      testCaseId({ ...profile, durationMs, bitrateKbps }),
    );
  });
}

function measurementDurationFor(schemaVersion) {
  return schemaVersion === currentSchemaVersion
    ? currentMeasurementDurationMs
    : legacyMeasurementDurationMs;
}

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
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

function stringArray(value, minimumLength, maximumLength, path, errors) {
  if (
    !Array.isArray(value) ||
    value.length < minimumLength ||
    value.length > maximumLength ||
    value.some(
      (entry) =>
        typeof entry !== "string" ||
        !entry.length ||
        entry.length > 160 ||
        /[^A-Za-z0-9.-]/u.test(entry),
    ) ||
    new Set(value).size !== value.length
  ) {
    add(errors, `${path} is not a valid unique bounded string array.`);
  }
}

function sameArray(left, right) {
  return (
    Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
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
