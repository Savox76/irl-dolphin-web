# IRL Dolphin device-test builds / Geräte-Testbuilds

Status: public test distribution for the private-source Android alpha; not a
public beta or store release.

## Deutsch

### Den richtigen Build erkennen

Jeder vollständig grüne `main`-Lauf der privaten App erzeugt eine eindeutig
benannte öffentliche Vorabversion unter
[GitHub Releases](https://github.com/Savox76/irl-dolphin-web/releases):

- Tag: `v<app-version>-test.<quality-run>`, zum Beispiel
  `v0.1.0-alpha.3-test.229`;
- APK: `irl-dolphin-v0.1.0-alpha.3-test.229-android-debug.apk`;
- Prüfsumme: gleichnamige Datei mit der Endung `-sha256.txt`;
- Buildnachweis: gleichnamige Datei mit der Endung `-build.json`.

Die Laufnummer im Namen ist zugleich `build.qualityRun` im späteren
Gerätebericht. Die JSON-Datei nennt außerdem den vollständigen App-Commit, den
Quality-Lauf, den Release-Tag, den APK-Dateinamen und dessen SHA-256-Wert. Damit
kann der Maintainer jeden Bericht eindeutig zum geprüften privaten Quellstand
und zum öffentlichen Download zurückverfolgen.

### Sicher installieren und prüfen

1. Öffne die neueste als **Pre-release** markierte Android-Testversion.
2. Lade nur die exakt benannte APK und die zugehörige `-sha256.txt` herunter.
3. Prüfe die APK vor der Installation:
   - Windows PowerShell: `Get-FileHash .\<apk-datei> -Algorithm SHA256`
   - Linux/macOS: `sha256sum -c <sha256-datei>`
4. Erlaube die Installation aus unbekannter Quelle nur für die verwendete
   Browser- oder Dateien-App und entziehe diese Erlaubnis danach wieder.
5. Folge der
   [Gerätequalifikations-Nachweiskette](DEVICE_QUALIFICATION_PIPELINE.md) und
   sende den vorausgefüllten Bericht erst nach eigener Kontrolle auf GitHub ab.

Die APK ist debug-signiert. Sie ist ausschließlich für Gerätetests bestimmt,
nicht für einen dauerhaften Produktivstream. Wird ein späterer Testbuild wegen
der Entwicklungssignatur nicht über den vorhandenen installiert, muss die alte
App gegebenenfalls deinstalliert werden; dabei gehen lokal gespeicherte
Einstellungen und Verbindungen verloren.

### Veröffentlichungsgrenze

Der private App-Quellcode wird nicht in dieses Repository kopiert. GitHub
Actions überträgt ausschließlich die geprüfte APK, Prüfsumme und begrenzte
Buildmetadaten. Zugangsdaten, Provider-Tokens, Streamschlüssel, Tester- oder
Gerätekennungen gehören weder in den Release noch in einen Gerätebericht.

Die bisherigen kurzlebigen Actions-Artefakte sind kein Downloadkanal mehr. Sie
werden nach der ersten erfolgreichen öffentlichen Veröffentlichung automatisch
entfernt, damit sie das Actions-Speicherkontingent nicht weiter belegen.

## English

### Identify the correct build

Every fully green `main` run of the private app creates an unambiguous public
pre-release on
[GitHub Releases](https://github.com/Savox76/irl-dolphin-web/releases):

- tag: `v<app-version>-test.<quality-run>`, for example
  `v0.1.0-alpha.3-test.229`;
- APK: `irl-dolphin-v0.1.0-alpha.3-test.229-android-debug.apk`;
- checksum: the matching file ending in `-sha256.txt`;
- build evidence: the matching file ending in `-build.json`.

The number in the name is also `build.qualityRun` in a later device report.
The JSON file additionally records the full app commit, Quality run, release
tag, APK filename and SHA-256 value. A maintainer can therefore bind every
report to the reviewed private source revision and its public download.

### Install and verify safely

1. Open the newest Android test version marked **Pre-release**.
2. Download only the exactly named APK and its matching `-sha256.txt` file.
3. Verify the APK before installation:
   - Windows PowerShell: `Get-FileHash .\<apk-file> -Algorithm SHA256`
   - Linux/macOS: `sha256sum -c <sha256-file>`
4. Allow unknown-app installation only for the browser or files app used for
   this install, then disable that permission again.
5. Follow the
   [device qualification evidence pipeline](DEVICE_QUALIFICATION_PIPELINE.md)
   and submit the prefilled GitHub report only after reviewing it yourself.

The APK is debug-signed. It is for device testing only, not continuous
production streaming. If Android cannot update an older test build because of
development signing, the previous app may need to be uninstalled; that removes
locally stored settings and connections.

### Publication boundary

The private app source is not copied into this repository. GitHub Actions
transfers only the tested APK, its checksum and bounded build metadata.
Credentials, provider tokens, stream keys and tester or stable device
identifiers belong in neither the release nor a device report.

Short-lived Actions artifacts are no longer the download channel. They are
removed automatically after the first successful public publication so they no
longer consume the Actions storage allowance.
