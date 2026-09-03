# IRL Dolphin pre-release master plan

Document version 1.0 — 2026-09-03

Baseline: `v0.1.0-alpha.3`

Status: private Android alpha; physical-device qualification pending

This plan supplements `MASTERPLAN.md`. The product master plan owns the full
long-term scope; this document owns the concrete gates from private alpha to the
first public release.

## Deutsch

### Ziel der Vorversion

Die Vorversion ist erreicht, wenn ein reproduzierbarer Android-Build und ein
testbarer iOS-Build vorliegen, jede beworbene Funktion auf realen Geräten
geprüft wurde, unvollständige Anbieter sichtbar gekennzeichnet sind, alle
Anleitungen in Deutsch und Englisch existieren und kein kritischer Fehler oder
ungeklärter Store-Blocker offen ist.

Die aktuellen `93%` messen MVP-/Technikgrundlagen. Die separat ausgewiesenen
`37%` messen ausschließlich nutzbare Funktionsparität zum früheren
Referenzprodukt. Implementierungsfortschritt allein ist kein Release-Gate.

### Verbindliche Grundsätze

1. `main` muss vor jeder Veröffentlichung vollständig grün sein.
2. Funktionen erhalten Tests, DE/EN-Texte und Dokumentation im selben
   Änderungssatz.
3. Eine Anbieter-Störung darf keine andere Verbindung blockieren.
4. Tokens, Passwörter, Client-Secrets, Chats und Spendendaten dürfen nie in
   Diagnosen oder Fehlerberichten landen.
5. OBS bleibt im privaten LAN; Portfreigabe ins Internet ist kein zulässiger
   Einrichtungsschritt.
6. Android-Hintergrundarbeit startet nur durch eine sichtbare Nutzeraktion und
   bleibt immer stoppbar.
7. iOS bleibt im Vordergrund, solange kein passender Apple-Hintergrunddienst
   existiert.
8. Anbieter-Anmeldung, Updates, Sicherheit und der nützliche lokale Kern bleiben
   ohne Paywall.

### Gate A — Alpha-Grundlage (erfüllt)

- [x] Flutter-/Dart-Basis mit Android- und iOS-Runner
- [x] Deutsche/englische Oberfläche und System-/Hell-/Dunkelmodus
- [x] Geschützte lokale Zugangsdatenablage
- [x] Twitch-Anmeldung, EventSub-Chat, Versand und sichere Moderation
- [x] Lokales OBS WebSocket v5 mit Szenen, Favoriten, Quellen und Diagnose
- [x] StreamElements Astro, geschütztes Profil und Live-Aktivitätsansicht
- [x] Opt-in TTS mit Historien-Schutz und Anbieterfiltern
- [x] Flüchtige lokale Diagnose und streng begrenzter Einstellungstransfer
- [x] Bewusst gestartete Android-Hintergrundsitzung
- [x] Getestete iOS-Foreground-only-Grenze
- [x] Automatisierte Analyse, Tests und Android-Debug-Build
- [x] Interner Release `v0.1.0-alpha.3`

Abnahme: Der interne Testbuild wird ausschließlich aus einem vollständig grünen
`main` erzeugt und enthält keine geheimen Werte.

### Gate B — Physische Alpha-Qualifizierung (als Nächstes)

#### Huawei T15 Pro / Android 16

- [ ] Saubere Installation, Kaltstart und Startbildschirm
- [ ] Gerätesprache DE/EN sowie System-/Hell-/Dunkelmodus
- [ ] Portrait/Landscape, Rotation und Seiten-Wiederherstellung
- [ ] Prozessneustart, niedriger Speicher, Task-Entfernung und Force Stop
- [ ] Benachrichtigungs- und Energiemanagement dokumentieren

#### Twitch, OBS, StreamElements und TTS

- [ ] Twitch-Anmeldung, Token-Erneuerung, Live-Chat, Versand und Moderation
- [ ] WLAN-/Mobilfunkwechsel, Offline-Zustand und manueller Retry
- [ ] OBS im privaten LAN: Authentifizierung, Szenen, Favoriten, Hide/Show,
  Quellen, Start/Stopp und plausible Leistungswerte
- [ ] Nachweisen, dass Diagnoseaktualisierung keine OBS-Einstellung verändert
- [ ] StreamElements mit realem kontrolliertem Kanal verbinden und trennen
- [ ] TTS mit Bluetooth, Telefonanruf, Navigation und App-Fortsetzung
- [ ] Sicherstellen, dass Historie niemals TTS auslöst

#### Android-Hintergrundsitzung

- [ ] Benachrichtigung erlaubt, abgelehnt und weggeklickt
- [ ] Stopp in der App, aus der Benachrichtigung und durch Android
- [ ] Keine automatische Verbindung oder Wiederherstellung nach Neustart
- [ ] Bereits aktive Chats/TTS im Hintergrund ohne Wiederholung
- [ ] Verhalten am Android-15+-Zeitlimit dokumentieren

Abnahme: Kein kritischer oder hoher Fehler bleibt offen. Jeder reproduzierbare
Fehler besitzt ein Issue, einen sicheren Diagnosecode und – wenn technisch
möglich – einen Regressionstest.

### Gate C — Funktionsvollständige Beta-Basis

- [ ] Native Google-OAuth-Aktivierung und offizieller YouTube-Live-Transport
- [ ] Kick-App plus signaturprüfendes HTTPS/WSS-Relay oder Kick sichtbar aus dem
  beworbenen Beta-Umfang herausnehmen
- [ ] Offizielle YouTube-/Kick-Artworks erst nach stabiler Provider-Grundlage
- [ ] Endgültiges Logo und minimale Android-/iOS-Versionen festlegen
- [x] Technische Datenschutzinformation und vollständiges Dateninventar für
  den aktuellen Alpha-Stand veröffentlichen
- [ ] Verantwortlichen-/Kontaktangaben, Rechtsgrundlagen, Betroffenenrechte und
  Store-Angaben vor der öffentlichen Beta ergänzen
- [ ] Vordergrundfunktionen auf repräsentativen iPhones testen
- [ ] Supportweg, Sicherheitsmeldungen und Update-Ablauf dokumentieren
- [ ] Kostenobergrenze für Kick-/Bridge-Infrastruktur festlegen

Abnahme: Jede auf Website, Store-Entwurf und in der App beworbene Funktion ist
auf mindestens einem realen Zielgerät nutzbar. Nicht enthaltene Funktionen sind
überall identisch gekennzeichnet.

### Gate D — Release Candidate

- [ ] Gerätematrix: Samsung, Pixel, Xiaomi, Huawei und iPhone
- [ ] Saubere Installation und Upgrade vom vorherigen internen Build
- [ ] Einstellungen-Migration und ungültige/ältere Importdokumente
- [ ] Android-In-App-Update und bestätigter iOS-App-Store-Handoff
- [ ] Geschützte Store-Signierung, interne Tracks und TestFlight
- [ ] DE/EN-Store-Texte, echte Screenshots und Supportseite
- [ ] Release-, Rollback-, Feature-Disable- und Notfallplan
- [ ] Barrierefreiheit, 200%-Textvergrößerung und Touch-Ziele
- [ ] Lizenz- und finale Monetarisierungsentscheidung

Abnahme: Release-Checkliste vollständig, alle Pflichtprüfungen grün, kein
Release-Blocker und dokumentierter Rückweg zur letzten stabilen Version.

### Gate E — Öffentliche Version 1.0

- [ ] Gestufter Rollout mit vorher festgelegten Stop-Kriterien
- [ ] Sichtbare bekannte Einschränkungen und Kompatibilitätsmatrix
- [ ] Öffentlicher Changelog, Supportweg und Sicherheitskontakt
- [ ] Monatliche Provider-/OBS- und quartalsweise Flutter-Prüfung
- [ ] Regelmäßige Kontrolle von Abhängigkeiten und Betriebskosten
- [ ] Pro-Funktionen erst nach separater Datenschutz-, Kosten- und
  Kaufverifikationsfreigabe

Abnahme: Die gestufte Auslieferung ist stabil; Wartung, Support und Kosten sind
dauerhaft tragfähig.

### Externe Blocker

| Blocker | Benötigt | Unzulässiger Ersatz |
|---|---|---|
| Android-Qualifizierung | Echtes Gerät, Testkonten, OBS-Rechner | Nur Unit-/Widget-Tests |
| Google OAuth | Eigentümergeführte Android-/iOS-Registrierungen | Client-Secret in der App |
| Kick | Registrierte App, geheimes Relay, Signatur-/Replay-Schutz | Inoffizielle Endpunkte |
| iOS/TestFlight | Apple Developer, Signing, echte iPhones | Falscher Background-Modus |
| Stores | Store-Konten, Datenschutzangaben, geschützte Schlüssel | Debug-Signatur |

### Website und Dokumentation

- [x] Responsive GitHub-Pages-Website mit DE/EN-Umschaltung
- [x] Getrennte Fortschrittswerte und ehrlicher Alpha-Status
- [x] Funktionsmatrix: umgesetzt/eingeschränkt/geplant
- [x] Konfigurationsanleitungen für alle aktuellen Alpha-Bausteine
- [x] Sichtbare YouTube-/Kick-, iOS- und OBS-Sicherheitsgrenzen
- [x] Vorversions-Masterplan und Nutzerhandbücher DE/EN
- [x] Öffentliche technische Datenschutz-/Datenübersicht
- [ ] Echte App-Screenshots nach Stabilisierung der Beta-Oberfläche
- [ ] Geräte-/Kompatibilitätsmatrix nach physischen Tests
- [ ] Release-Notes-Ansicht nur aus freigegebenen Releases
- [ ] Datenschutz- und Supportseiten vor öffentlicher Beta

Änderungen an Bedienung, Funktionsstatus, Sicherheit oder Releasegrenzen
aktualisieren die Website im selben Pull Request.

---

## English

### Pre-release objective

The pre-release is reached when reproducible Android and testable iOS builds
exist, every advertised capability has passed physical-device testing,
incomplete providers are clearly labelled, all instructions exist in English
and German, and no critical defect or unresolved store blocker remains.

The current `93%` measures MVP/technical foundations. The separate `37%`
measures usable feature parity with the former reference product.
Implementation progress alone is not a release gate.

### Binding principles

1. `main` must be fully green before every publication.
2. Features ship with tests, EN/DE copy and documentation together.
3. One provider failure must never block another connection.
4. Tokens, passwords, client secrets, chats and donation data never enter
   diagnostics or bug reports.
5. OBS stays on the private LAN; public port forwarding is never setup.
6. Android background work starts only through a visible user action and always
   remains stoppable.
7. iOS stays foreground-only until a qualifying Apple service exists.
8. Provider sign-in, updates, security and the useful local core remain free.

### Gate A — Alpha foundation (passed)

- [x] Flutter/Dart baseline with Android and iOS runners
- [x] EN/DE UI with system/light/dark appearance
- [x] Protected local credential storage
- [x] Twitch sign-in, EventSub chat, sending and safe moderation
- [x] Local OBS WebSocket v5 with scenes, favorites, sources and diagnostics
- [x] StreamElements Astro, protected profile and live activity view
- [x] Opt-in TTS with history protection and provider filters
- [x] Volatile local diagnostics and strictly bounded settings transfer
- [x] User-started Android background session
- [x] Enforced iOS foreground-only boundary
- [x] Automated analysis, tests and Android debug build
- [x] Internal `v0.1.0-alpha.3` release

Acceptance: the internal test build comes only from fully green `main` and
contains no secret values.

### Gate B — Physical alpha qualification (next)

#### Huawei T15 Pro / Android 16

- [ ] Clean install, cold start and launch screen
- [ ] EN/DE device language and system/light/dark appearance
- [ ] Portrait/landscape, rotation and page restoration
- [ ] Process recreation, low memory, task removal and force stop
- [ ] Document notification and power-management behavior

#### Twitch, OBS, StreamElements and TTS

- [ ] Twitch sign-in, token renewal, live chat, sending and moderation
- [ ] Wi-Fi/mobile handover, offline state and manual retry
- [ ] Private-LAN OBS authentication, scenes, favorites, hide/show, sources,
  start/stop and plausible performance metrics
- [ ] Prove diagnostics refresh changes no OBS setting
- [ ] Connect/disconnect StreamElements against a controlled real channel
- [ ] TTS with Bluetooth, phone call, navigation and app resume
- [ ] Verify history never reaches TTS

#### Android background session

- [ ] Notification granted, denied and dismissed
- [ ] Stop in-app, from notification and by Android
- [ ] No automatic provider connection or restart after reboot
- [ ] Already-active chat/TTS continues without replay
- [ ] Document behavior at the Android 15+ time limit

Acceptance: no critical or high defect remains. Every reproducible defect has an
issue, safe diagnostic code and, where possible, regression test.

### Gate C — Feature-complete beta baseline

- [ ] Native Google OAuth activation and official YouTube live transport
- [ ] Kick app plus signature-verifying HTTPS/WSS relay, or visibly exclude
  Kick from the advertised beta scope
- [ ] Official YouTube/Kick artwork only after provider stability
- [ ] Final logo and minimum Android/iOS versions
- [x] Publish technical privacy information and the complete current-alpha
  data inventory
- [ ] Add controller/contact, legal bases, data-subject rights and store
  disclosures before public beta
- [ ] Foreground testing on representative physical iPhones
- [ ] Support, security-report and update flows
- [ ] Operating-cost ceiling for Kick/Bridge infrastructure

Acceptance: every capability advertised on the site, store draft and in-app UI
works on at least one physical target. Exclusions are labelled consistently.

### Gate D — Release candidate

- [ ] Samsung, Pixel, Xiaomi, Huawei and iPhone device matrix
- [ ] Clean install and previous-internal-build upgrade
- [ ] Settings migration and invalid/older import documents
- [ ] Android in-app update and confirmed iOS App Store handoff
- [ ] Protected store signing, internal tracks and TestFlight
- [ ] EN/DE store copy, real screenshots and support site
- [ ] Release, rollback, feature-disable and emergency plans
- [ ] Accessibility, 200% text enlargement and touch targets
- [ ] License and final monetization decision

Acceptance: checklist complete, all required checks green, no release blocker,
and a documented return to the last stable version.

### Gate E — Public version 1.0

- [ ] Staged rollout with predefined stop criteria
- [ ] Visible known limitations and compatibility matrix
- [ ] Public changelog, support path and security contact
- [ ] Monthly provider/OBS and quarterly Flutter review
- [ ] Regular dependency and operating-cost review
- [ ] Pro functionality only after separate privacy, cost and purchase-
  verification approval

Acceptance: staged delivery remains stable and maintenance, support and costs
are sustainable.

### External blockers

| Blocker | Requires | Invalid substitute |
|---|---|---|
| Android qualification | Real device, test accounts, OBS computer | Unit/widget tests only |
| Google OAuth | Owner-controlled Android/iOS registrations | In-app client secret |
| Kick | Registered app, secret relay, signature/replay protection | Unofficial endpoints |
| iOS/TestFlight | Apple Developer, signing, physical iPhones | False background mode |
| Stores | Store accounts, privacy disclosure, protected keys | Debug signing |

### Website and documentation

- [x] Responsive GitHub Pages site with EN/DE switching
- [x] Separate progress measures and honest alpha status
- [x] Implemented/limited/planned feature matrix
- [x] Configuration guides for all current alpha capabilities
- [x] Visible YouTube/Kick, iOS and OBS safety boundaries
- [x] Pre-release master plan and EN/DE user guides
- [x] Public technical privacy/data overview
- [ ] Real screenshots after the beta UI stabilizes
- [ ] Device/compatibility matrix after physical tests
- [ ] Release-note view from approved releases only
- [ ] Privacy and support pages before public beta

Changes to operation, feature status, security or release boundaries update the
website in the same pull request.
