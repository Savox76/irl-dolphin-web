import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  "website/index.html",
  "website/styles.css",
  "website/app.js",
  "website/verified-devices.json",
  "website/assets/irl-dolphin-field-vision.webp",
  "docs/PRE_RELEASE_MASTERPLAN.md",
  "docs/PRIVACY_AND_DATA_INVENTORY.md",
  "docs/DEVICE_QUALIFICATION_PIPELINE.md",
  "docs/USER_GUIDE_DE.md",
  "docs/USER_GUIDE_EN.md",
  "tool/device_report.mjs",
  "tool/build_verified_devices.mjs",
  "tool/test_device_reports.mjs",
  ".github/workflows/device-reports.yml",
];

const forbiddenPublicLinks = [
  "github.com/Savox76/irl-dolphin/blob/main/docs",
  "savox76.github.io/irl-dolphin/",
];

const failures = [];

for (const relativePath of requiredFiles) {
  const path = resolve(root, relativePath);
  if (!existsSync(path) || !readFileSync(path, "utf8").trim()) {
    failures.push(`Missing or empty required file: ${relativePath}`);
  }
}

const html = readFileSync(resolve(root, "website/index.html"), "utf8");
const script = readFileSync(resolve(root, "website/app.js"), "utf8");
const css = readFileSync(resolve(root, "website/styles.css"), "utf8");
const masterplan = readFileSync(resolve(root, "docs/PRE_RELEASE_MASTERPLAN.md"), "utf8");
const privacyInventory = readFileSync(resolve(root, "docs/PRIVACY_AND_DATA_INVENTORY.md"), "utf8");
const devicePipeline = readFileSync(
  resolve(root, "docs/DEVICE_QUALIFICATION_PIPELINE.md"),
  "utf8",
);
const germanGuide = readFileSync(resolve(root, "docs/USER_GUIDE_DE.md"), "utf8");
const englishGuide = readFileSync(resolve(root, "docs/USER_GUIDE_EN.md"), "utf8");
const deviceWorkflow = readFileSync(resolve(root, ".github/workflows/device-reports.yml"), "utf8");
const verifiedDevices = JSON.parse(
  readFileSync(resolve(root, "website/verified-devices.json"), "utf8"),
);

const requiredHtmlPatterns = [
  [/<html lang="de"/, "default document language"],
  [/name="viewport"/, "responsive viewport"],
  [/<main id="main">/, "main landmark"],
  [/data-language="de"/, "German language control"],
  [/data-language="en"/, "English language control"],
  [/id="vision"/, "product vision section"],
  [/id="features"/, "feature section"],
  [/id="setup"/, "setup section"],
  [/id="roadmap"/, "roadmap section"],
  [/id="security"/, "security section"],
  [/id="privacy"/, "privacy and data section"],
  [/id="devices"/, "verified devices section"],
];

for (const [pattern, name] of requiredHtmlPatterns) {
  if (!pattern.test(html)) failures.push(`index.html lacks ${name}`);
}

for (const link of forbiddenPublicLinks) {
  if (html.includes(link)) failures.push(`Website contains obsolete public link: ${link}`);
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) failures.push(`Duplicate HTML ids: ${[...new Set(duplicateIds)].join(", ")}`);

for (const asset of ["styles.css", "app.js", "assets/irl-dolphin-field-vision.webp"]) {
  if (!html.includes(`\"${asset}\"`)) failures.push(`index.html does not reference ${asset}`);
  if (!existsSync(resolve(root, "website", asset))) failures.push(`Missing local asset: ${asset}`);
}

const forbiddenWebsitePatterns = [
  [/http:\/\//i, "insecure HTTP link"],
  [/(client[_ -]?secret|access[_ -]?token)\s*[:=]\s*[A-Za-z0-9_-]{12,}/i, "possible embedded secret"],
];

for (const [pattern, name] of forbiddenWebsitePatterns) {
  if (pattern.test(`${html}\n${script}`)) failures.push(`Website contains ${name}`);
}

for (const [pattern, name] of [
  [/irl[- ]link/i, "a public reference to the former inspiration"],
  [/(referenzprodukt|former reference product)/i, "a public reference-product attribution"],
]) {
  if (pattern.test(`${html}\n${script}\n${masterplan}\n${germanGuide}\n${englishGuide}`)) {
    failures.push(`Public content contains ${name}`);
  }
}

for (const token of [
  "v0.1.0-alpha.3",
  "93%",
  "37%",
  "0%",
  "Nutzbarer Funktionsumfang",
  "Usable feature scope",
  "Media transmission / multi-device",
  "Medienübertragung / Mehrgeräte",
  "RTMP / RTMPS",
  "SRTLA",
  "RIST",
  "Port 4455",
  "Never forward port 4455",
  "YouTube",
  "Kick",
  "StreamElements",
  "Android background session",
  "Open data inventory",
  "Geprüfte Geräte",
  "Verified devices",
]) {
  if (!`${html}\n${script}`.includes(token)) failures.push(`Bilingual website lacks required content: ${token}`);
}

for (const token of [
  "## Deutsch",
  "## English",
  "device-report-valid",
  "device-verified",
  "media.hardwareH264",
  "app.shell",
  "never submits in the background",
]) {
  if (!devicePipeline.includes(token)) {
    failures.push(`Device qualification pipeline lacks: ${token}`);
  }
}

if (
  verifiedDevices.schemaVersion !== 1 ||
  !Array.isArray(verifiedDevices.devices)
) {
  failures.push("verified-devices.json has an invalid top-level schema");
}

for (const token of [
  "issues: write",
  "device-report-valid",
  "device-report-invalid",
  "device-report-complete",
  "device-report-partial",
  "awaiting-device-verification",
  "device-verified",
  'context.payload.action === "edited"',
  "IRL_DOLPHIN_VERIFIED_REPORT_V1",
]) {
  if (!deviceWorkflow.includes(token)) {
    failures.push(`Device-report workflow lacks required safeguard: ${token}`);
  }
}

for (const token of [
  "model.textContent = device.deviceModel",
  "description.textContent = value",
  "verified-devices.json",
  "devicePlanCoverage",
]) {
  if (!script.includes(token)) {
    failures.push(`Verified-device rendering lacks safe data handling: ${token}`);
  }
}

for (const token of ["## Deutsch", "## English", "Gate A", "Gate B", "Gate C", "Gate D", "Gate E", "Gate F"]) {
  if (!masterplan.includes(token)) failures.push(`Pre-release master plan lacks: ${token}`);
}

for (const token of [
  "## English",
  "## Deutsch",
  "### Data inventory",
  "### Dateninventar",
  "Twitch",
  "StreamElements",
  "OBS",
  "No alpha feature sends data to analytics",
  "Keine Alpha-Funktion sendet Daten an Analyse",
]) {
  if (!privacyInventory.includes(token)) failures.push(`Privacy inventory lacks: ${token}`);
}

for (const [guide, language, tokens] of [
  [germanGuide, "German", ["Twitch", "OBS Studio", "StreamElements", "Chat-Sprachausgabe", "Hintergrundsitzung", "Lokale Diagnose", "Datenschutz & Daten", "Mehrgerätebetrieb", "SRTLA", "RIST"]],
  [englishGuide, "English", ["Twitch", "OBS Studio", "StreamElements", "text-to-speech", "background session", "Local diagnostics", "Privacy and data", "multi-device operation", "SRTLA", "RIST"]],
]) {
  for (const token of tokens) {
    if (!guide.includes(token)) failures.push(`${language} guide lacks: ${token}`);
  }
}

if (!css.includes("@media (max-width: 660px)")) failures.push("Website lacks a mobile breakpoint");
if (!css.includes("prefers-reduced-motion")) failures.push("Website lacks reduced-motion handling");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("IRL Dolphin website validation passed.");
