# Device qualification evidence pipeline / Gerätequalifikations-Nachweiskette

Status: pipeline foundation implemented; no device is considered verified merely
because it submitted a report.

## Deutsch

### Zweck und aktueller Umfang

Die Nachweiskette macht physische Testergebnisse maschinell auswertbar, ohne
einen App-Token, einen eigenen Backenddienst oder eine stabile Gerätekennung
einzuführen. Schema Version 1 deckt ausschließlich den ausdrücklich gestarteten
lokalen Pfad **Kamera → Hardware-H.264-Encoder** ab. Es bestätigt weder
Netzwerktransport noch OBS, einen IRL-Host oder einen Streamingdienst.

Jeder Lauf besitzt:

- eine Reihenfolge-ID wie `run-001`,
- eine geräteübergreifend vergleichbare Testfall-ID wie
  `media.hardware-h264.1920x1080.60fps.9000kbps.5000ms`,
- den Modulnamen `media.hardwareH264`,
- das Szenario `manualProfile`,
- Anforderung, Ergebnis oder festen Fehlercode und Build-Herkunft.

### Lebenszyklus

| Zustand | Automatik | Bedeutung |
|---|---|---|
| Ungetestet | kein Eintrag | Für das Gerät wird keine Kompatibilität behauptet. |
| Lokal gemessen | JSON nur im Arbeitsspeicher | Der Tester kann alle Felder kopieren und prüfen. |
| Öffentlich eingereicht | vorausgefülltes GitHub-Issue nach ausdrücklicher Bestätigung | Erst das abschließende Absenden auf GitHub veröffentlicht den Bericht. |
| `device-report-valid` | Schema-, Größen-, Prüfsummen- und Feldprüfung | Der Bericht ist formal auswertbar, aber noch kein bestätigter Gerätenachweis. |
| `device-verified` | nur nach Maintainer-Prüfung | Build-Herkunft und Messwerte wurden geprüft; die Website darf den Eintrag zeigen. |
| Nachträglich bearbeitet | Freigabe wird entzogen | Die geänderte Prüfsumme benötigt eine neue Prüfung. |

Die App überträgt nichts im Hintergrund. Sie öffnet ein vollständig
vorausgefülltes öffentliches Issue. Dieser letzte bewusste GitHub-Schritt ist
notwendig, weil der Bericht öffentlich wird und Tester ihn vor dem Absenden
sehen und kontrollieren sollen.

### Sicherheits- und Datenschutzgrenzen

Der öffentliche Bericht enthält Gerätemodell, Betriebssystem- und App-Version,
Hardware-Encoder, Testzeitpunkte, gewählte Auflösung, FPS und Bitrate,
Messwerte sowie Commit und Quality-Run. Er enthält keine Kamera- oder
Audiodaten, Chats, Konten, Zugangsdaten, Streamschlüssel, Seriennummer, IMEI
oder andere stabile Gerätekennung.

Die SHA-256-Prüfsumme erkennt Änderungen am eingebetteten JSON. Sie ist keine
kryptografische Geräte- oder Testeridentität. Deshalb bleibt die getrennte
Maintainer-Prüfung erforderlich. Die öffentliche Website verarbeitet nur
Berichte mit gültigem Schema, `device-verified`-Label und einer
Workflow-Bestätigung, die exakt zur aktuellen Prüfsumme passt.

Das lokale Ergebnis verschwindet beim Leeren oder beim Ende des App-Prozesses.
Ein abgesendetes GitHub-Issue bleibt entsprechend der GitHub-Aufbewahrung
öffentlich, bis es vom Autor oder Repository-Maintainer bearbeitet oder
entfernt wird.

### Weitere Funktionen

Andere Funktionsgruppen werden nicht fälschlich durch den Medienbericht
abgedeckt. Spätere geführte Pläne erhalten eigene versionierte Modul- und
Testfallfamilien, zum Beispiel `app.shell`, `twitch.chat`, `obs.control`,
`tts.route` und `background.session`. Ein Modul darf erst in eine
Kompatibilitätsaussage einfließen, wenn sein eigenes Schema, seine
Abnahmekriterien und seine physischen Tests implementiert sind.

## English

### Purpose and current scope

The evidence pipeline makes physical test results machine-readable without
embedding an app token, operating a custom backend or introducing a stable
device identifier. Schema version 1 covers only the explicitly started local
**camera → hardware H.264 encoder** path. It does not confirm network transport,
OBS, an IRL host or any streaming service.

Every run has an ordinal ID such as `run-001`, a cross-device test-case ID such
as `media.hardware-h264.1920x1080.60fps.9000kbps.5000ms`, the
`media.hardwareH264` module, the `manualProfile` scenario, its request,
result or bounded failure code, and build provenance.

### Lifecycle

| State | Automation | Meaning |
|---|---|---|
| Untested | no entry | No compatibility is claimed for the device. |
| Measured locally | JSON exists only in memory | The tester can copy and inspect every field. |
| Submitted publicly | prefilled GitHub issue after explicit confirmation | Only the final GitHub submission publishes the report. |
| `device-report-valid` | schema, size, checksum and field validation | The report is machine-readable, but it is not yet verified evidence. |
| `device-verified` | only after maintainer review | Build provenance and measurements were reviewed; the website may list it. |
| Edited later | approval is revoked | The changed checksum requires another review. |

The app never submits in the background. It opens a completely prefilled public
issue. This final deliberate GitHub step is required because the report becomes
public and testers must be able to review it before submission.

### Security and privacy boundaries

The public report includes device model, OS and app versions, hardware encoder,
test timestamps, selected resolution, FPS and bitrate, measurements, commit and
quality run. It excludes camera/audio content, chat, accounts, credentials,
stream keys, serial number, IMEI and any other stable device identifier.

The SHA-256 checksum detects changes to the embedded JSON. It is not a
cryptographic device or tester identity, so separate maintainer review remains
mandatory. The public website consumes only a valid report carrying the
`device-verified` label and a workflow confirmation bound to the exact current
checksum.

Local results disappear when cleared or when the app process ends. A submitted
GitHub issue remains public under GitHub retention until its author or a
repository maintainer edits or removes it.

### Other capabilities

The media report does not pretend to cover other feature groups. Future guided
plans receive separate versioned module and test-case families, for example
`app.shell`, `twitch.chat`, `obs.control`, `tts.route` and
`background.session`. A module can influence a compatibility claim only after
its own schema, acceptance criteria and physical tests exist.

