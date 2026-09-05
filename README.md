# IRL Dolphin Website

Public website and bilingual documentation for **IRL Dolphin**, a planned mobile
production, control, transmission and interaction platform for IRL livestreaming.
The current private Android alpha provides the control and interaction
foundation; camera transmission and multi-device operation are committed to the
roadmap but not implemented yet.

## Live website

<https://savox76.github.io/irl-dolphin-web/>

## Documentation

- [Pre-release master plan](docs/PRE_RELEASE_MASTERPLAN.md)
- [Privacy and data inventory / Datenschutz und Dateninventar](docs/PRIVACY_AND_DATA_INVENTORY.md)
- [Device qualification evidence pipeline / Gerätequalifikations-Nachweiskette](docs/DEVICE_QUALIFICATION_PIPELINE.md)
- [Deutsche Anleitung](docs/USER_GUIDE_DE.md)
- [English guide](docs/USER_GUIDE_EN.md)

## Repository scope

This public repository contains the static project website, public
documentation, redacted device-report issues, their guided-plan coverage and
validation workflow, and the generated verified-device list. The IRL Dolphin
application source remains private.

## Local preview

Serve the repository root with any static HTTP server and open `/website/`, or open `website/index.html` directly for a quick preview.

## Validation

```bash
node --check website/app.js
node tool/validate_website.mjs
node tool/test_device_reports.mjs
```
