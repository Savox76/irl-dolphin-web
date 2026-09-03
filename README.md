# IRL Dolphin Website

Public website and bilingual documentation for **IRL Dolphin**, an Android companion app for IRL livestreaming.

## Live website

<https://savox76.github.io/irl-dolphin-web/>

## Documentation

- [Pre-release master plan](docs/PRE_RELEASE_MASTERPLAN.md)
- [Privacy and data inventory / Datenschutz und Dateninventar](docs/PRIVACY_AND_DATA_INVENTORY.md)
- [Deutsche Anleitung](docs/USER_GUIDE_DE.md)
- [English guide](docs/USER_GUIDE_EN.md)

## Repository scope

This public repository contains only the static project website, public documentation, and its GitHub Pages deployment workflow. The IRL Dolphin application source remains private.

## Local preview

Serve the repository root with any static HTTP server and open `/website/`, or open `website/index.html` directly for a quick preview.

## Validation

```bash
node --check website/app.js
node tool/validate_website.mjs
```
