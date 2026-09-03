# IRL Dolphin pre-release master plan

Document version 1.1 — 2026-09-03

Baseline: `v0.1.0-alpha.3`

Status: private Android alpha; physical-device qualification pending

This plan supplements `MASTERPLAN.md`. The product master plan owns the full
long-term scope; this document owns the concrete gates from private alpha to the
first public release, including the newly committed media and multi-device
scope.

## Deutsch

### Ziel der Vorversion

Die Vorversion ist erreicht, wenn IRL Dolphin nicht nur Chat und vorhandene
OBS-Funktionen steuert, sondern einen qualifizierten Medienpfad von mindestens
einer Kamera zu einem lokalen OBS oder externen IRL-Host bereitstellt. Ein
reproduzierbarer Android-Build und ein testbarer iOS-Build müssen vorliegen,
jede beworbene Funktion muss auf realen Geräten geprüft sein, unvollständige
Anbieter müssen sichtbar gekennzeichnet sein und kein kritischer Fehler oder
ungeklärter Store-Blocker darf offen bleiben.

Die aktuellen `93%` messen die bisherige MVP-/Technikgrundlage. Die separat
ausgewiesenen `37%` messen ausschließlich nutzbare Funktionsparität zum früheren
Referenzprodukt. Der neue Medien- und Mehrgeräte-Kern steht bewusst separat bei
`0%`: Er ist jetzt verbindlicher Produktumfang, aber noch nicht implementiert.
Implementierungsfortschritt allein ist kein Release-Gate.

### Verbindliches Zielbild

IRL Dolphin wird als mobile Produktions-, Steuerungs-, Übertragungs- und
Interaktionsplattform gebaut. Drei Betriebsarten müssen aus derselben
Oberfläche entstehen können:

| Modus | Ziel |
|---|---|
| **Solo** | Ein Gerät nimmt Bild/Ton auf, überträgt und hält Chat sowie Streamzustand sichtbar. |
| **Zentrale** | Ein Dolphin-Gerät steuert mehrere verbundene Kameras und erzeugt einen gemeinsamen Programmstream. |
| **Verteilt** | Mehrere Kamera-/Encoder-Knoten übertragen parallel direkt zum Ziel; ein Dolphin-Gerät koordiniert sie. |

Die Live-Oberfläche bleibt **Chat-first**. Chat, TTS, Alerts, Geräte- und
Verbindungszustände haben Vorrang; Kontrollbild oder Live-Vorschau sind optional
und dürfen die Übertragung nicht bestimmen.

Quellen werden über erweiterbare, fähigkeitsbasierte Adapter angebunden. Die
erste Ausbaustufe beginnt mit der Kamera und dem Mikrofon des Dolphin-Geräts;
USB/UVC-, IP- und herstellerspezifische Geräte folgen einzeln nach realer
Qualifizierung. Lokales OBS und externe IRL-Hosts sind eigenständige Zielprofile.
RTMPS und SRT bilden den ersten Transportpfad; RTMP, SRTLA und RIST folgen nur
mit passendem Empfänger, Fehlerbehandlung und nachgewiesener Stabilität.

### Verbindliche Grundsätze

1. `main` muss vor jeder Veröffentlichung vollständig grün sein.
2. Funktionen erhalten Tests, DE/EN-Texte und Dokumentation im selben
   Änderungssatz.
3. Eine Anbieter-Störung darf keine andere Verbindung blockieren.
4. Tokens, Passwörter, Client-Secrets, Chats und Spendendaten dürfen nie in
   Diagnosen oder Fehlerberichten landen.
5. OBS-WebSocket-Steuerung bleibt im privaten LAN; Port `4455` wird nie ins
   Internet freigegeben. Ein bewusst konfigurierter Medienausgang ist davon
   technisch und in der Oberfläche getrennt.
6. Android-Hintergrundarbeit startet nur durch eine sichtbare Nutzeraktion und
   bleibt immer stoppbar.
7. iOS bleibt im Vordergrund, solange kein passender Apple-Hintergrunddienst
   existiert.
8. Anbieter-Anmeldung, Updates, Sicherheit und der nützliche lokale Kern bleiben
   ohne Paywall.
9. Jeder Kamera-/Encoder-Adapter meldet nur nachgewiesene Fähigkeiten; unbekannte
   Geräte erhalten keine stillen Kompatibilitätsversprechen.
10. Im verteilten Modus senden Kamera-Knoten möglichst direkt zum Ziel, damit das
    steuernde Gerät weder Bandbreiten- noch Ausfall-Flaschenhals wird.
11. Medienquelle, Transport, Host, Chat-Anbieter und OBS-Steuerung bleiben
    getrennte Fehlerdomänen.

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

### Gate C — Medienkern für ein Gerät

- [ ] Native Kamera- und Mikrofonquelle mit eindeutigem Berechtigungsablauf
- [ ] Hardware-Encoding mit dokumentierten Auflösungs-, FPS- und Bitratenstufen
- [ ] Ein frei konfigurierbares RTMPS-Ziel und ein SRT-Ziel
- [ ] Getrennte Profile für lokales OBS und externen IRL-Host
- [ ] Sichere Ablage von Stream-Zugangsdaten ohne Diagnose- oder Exportleck
- [ ] Verbindungszustand, Paketverlust, Bitrate, Temperatur und Akku als
  verständliche Stream-Health-Werte
- [ ] Kontrollierter Reconnect und adaptive Bitrate mit klarer Nutzeranzeige
- [ ] Chat-first-Live-Ansicht mit optionalem Kontrollbild und optionaler
  Live-Vorschau
- [ ] Übertragung läuft unabhängig davon weiter, ob die Vorschau geöffnet ist
- [ ] Mindestens ein längerer realer Mobilfunk-/WLAN-Wechseltest

Abnahme: Ein unterstütztes Telefon kann Bild und Ton stabil an ein lokales OBS
und einen kontrollierten externen IRL-Host senden. Stream-Zugangsdaten bleiben
geschützt; Preview, Chat oder eine Anbieter-Störung stoppen den Medienpfad nicht.

### Gate D — Mehrgeräte- und IRL-Host-Beta

- [ ] Rollenmodell für Steuergerät, Kamera-Knoten und optionalen Programm-Knoten
- [ ] Sichere Kopplung, sichtbarer Besitz und widerrufbare Gerätefreigabe
- [ ] Mehrere Kamera-Knoten gleichzeitig mit eigenen Health-Karten
- [ ] Direkter Transport jedes Kamera-Knotens zum Ziel, wenn das Setup dies
  unterstützt
- [ ] Umschalten, Stummschalten, Trennen und kontrollierter Kamera-Fallback
- [ ] Zentraler Programmstream für geeignete Geräte ohne falsches
  Hardwareversprechen
- [ ] RTMP nur für bewusst gewählte lokale/Legacy-Ziele; extern bevorzugt RTMPS
- [ ] SRTLA nur mit kompatibler Bonding-/Relay-Gegenstelle qualifizieren
- [ ] RIST-Profil mit kompatiblem Receiver und dokumentierter Interoperabilität
- [ ] Erweiterbares Adaptermodell sowie erste USB/UVC- und IP-Kamera-Qualifizierung
- [ ] Ziel-/Geräte-Kompatibilitätsmatrix auf Basis realer Tests veröffentlichen

Abnahme: Mindestens zwei physische Quellen können gleichzeitig überwacht und zu
einem qualifizierten Ziel geführt werden. Der Ausfall eines Knotens, Transports
oder Hosts bleibt sichtbar und reißt unabhängige Quellen, Chat und Steuerung
nicht mit.

### Gate E — Release Candidate

- [ ] Native Google-OAuth-Aktivierung und offizieller YouTube-Live-Transport
- [ ] Kick-App plus signaturprüfendes HTTPS/WSS-Relay oder Kick sichtbar aus dem
  beworbenen Umfang herausnehmen
- [ ] Offizielle YouTube-/Kick-Artworks erst nach stabiler Provider-Grundlage
- [ ] Endgültiges Logo und minimale Android-/iOS-Versionen festlegen
- [x] Technische Datenschutzinformation und vollständiges Dateninventar für
  den aktuellen Alpha-Stand veröffentlichen
- [ ] Medien-, Geräte- und Hostdaten ins Dateninventar aufnehmen, bevor der
  erste nutzbare Medienbuild verteilt wird
- [ ] Verantwortlichen-/Kontaktangaben, Rechtsgrundlagen, Betroffenenrechte und
  Store-Angaben vor der öffentlichen Beta ergänzen
- [ ] Gerätematrix: Samsung, Pixel, Xiaomi, Huawei und iPhone
- [ ] Saubere Installation und Upgrade vom vorherigen internen Build
- [ ] Einstellungen-/Profil-Migration und ungültige/ältere Importdokumente
- [ ] Android-In-App-Update und bestätigter iOS-App-Store-Handoff
- [ ] Geschützte Store-Signierung, interne Tracks und TestFlight
- [ ] DE/EN-Store-Texte, echte Screenshots und Supportseite
- [ ] Release-, Rollback-, Feature-Disable- und Medien-Notfallplan
- [ ] Barrierefreiheit, 200%-Textvergrößerung und Touch-Ziele
- [ ] Lizenz-, Infrastrukturkosten- und finale Monetarisierungsentscheidung

Abnahme: Jede auf Website, Store-Entwurf und in der App beworbene Funktion ist
auf mindestens einem realen Zielgerät und kompatiblen Empfänger nutzbar. Die
Release-Checkliste ist vollständig, alle Pflichtprüfungen sind grün und der
Rückweg zur letzten stabilen Version ist dokumentiert.

### Gate F — Öffentliche Version 1.0

- [ ] Gestufter Rollout mit vorher festgelegten Stop-Kriterien
- [ ] Sichtbare bekannte Einschränkungen sowie Geräte-/Host-Kompatibilitätsmatrix
- [ ] Öffentlicher Changelog, Supportweg und Sicherheitskontakt
- [ ] Monatliche Provider-/OBS-/Host- und quartalsweise Flutter-Prüfung
- [ ] Regelmäßige Kontrolle von Abhängigkeiten, Relay- und Betriebskosten
- [ ] Pro-Funktionen erst nach separater Datenschutz-, Kosten- und
  Kaufverifikationsfreigabe

Abnahme: Die gestufte Auslieferung ist stabil; Übertragungsqualität, Wartung,
Support und Kosten sind dauerhaft tragfähig.

### Externe Blocker

| Blocker | Benötigt | Unzulässiger Ersatz |
|---|---|---|
| Android-Qualifizierung | Echtes Gerät, Testkonten, OBS-Rechner | Nur Unit-/Widget-Tests |
| Medienkern | Kamera-/Mikrofonzugriff, Hardware-Encoder, Testziele | Simulierte Übertragung allein |
| Externer IRL-Host | Kontrollierte RTMPS-/SRT-Empfänger und Zugangsdaten | OBS-WebSocket als Medientransport |
| SRTLA/RIST | Kompatible Sender-/Relay-/Receiver-Gegenstellen | Protokollname ohne Interoperabilitätstest |
| Geräteadapter | Physische USB/UVC-/IP-/Herstellergeräte und SDK-Rechte | Generische Kompatibilitätsbehauptung |
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
- [x] Verbindliches Solo-/Zentralen-/Mehrgeräte-Zielbild
- [x] Sichtbare Trennung zwischen aktueller Alpha und Medienkern bei `0%`
- [x] Geplanter Signalweg zu lokalem OBS oder externem IRL-Host
- [x] RTMP/RTMPS-, SRT-, SRTLA- und RIST-Strategie als geplant gekennzeichnet
- [x] Eigenständiges visuelles Zielbild für den mobilen Außeneinsatz
- [ ] Echte App-Screenshots nach Stabilisierung der Beta-Oberfläche
- [ ] Geräte-/Kompatibilitätsmatrix nach physischen Tests
- [ ] Release-Notes-Ansicht nur aus freigegebenen Releases
- [ ] Datenschutz- und Supportseiten vor öffentlicher Beta

Änderungen an Bedienung, Funktionsstatus, Sicherheit oder Releasegrenzen
aktualisieren die Website im selben Pull Request.

---

## English

### Pre-release objective

The pre-release is reached when IRL Dolphin does more than control chat and its
existing OBS capabilities: it must provide a qualified media path from at least
one camera to local OBS or an external IRL host. Reproducible Android and
testable iOS builds must exist, every advertised capability must pass physical
device testing, incomplete providers must be clearly labelled, and no critical
defect or unresolved store blocker may remain.

The current `93%` measures the existing MVP/technical foundation. The separate
`37%` measures usable feature parity with the former reference product. The new
media and multi-device core is deliberately tracked at `0%`: it is now committed
product scope, but is not implemented yet. Implementation progress alone is not
a release gate.

### Committed target experience

IRL Dolphin will be built as a mobile production, control, transmission and
interaction platform. The same product must support three operating modes:

| Mode | Target |
|---|---|
| **Solo** | One device captures audio/video, transmits and keeps chat plus stream health visible. |
| **Hub** | One Dolphin device controls multiple attached cameras and produces one program stream. |
| **Distributed** | Multiple camera/encoder nodes transmit directly to the target while one Dolphin device coordinates them. |

The live surface remains **chat-first**. Chat, TTS, alerts, device and
connection health take priority; a confidence frame or live preview is optional
and must never determine whether transmission continues.

Sources connect through extensible capability-based adapters. The first slice
starts with the Dolphin device camera and microphone; USB/UVC, IP and
vendor-specific devices follow one by one after physical qualification. Local
OBS and external IRL hosts are separate target profiles. RTMPS and SRT form the
first transport path; RTMP, SRTLA and RIST follow only with a compatible
receiver, failure handling and proven stability.

### Binding principles

1. `main` must be fully green before every publication.
2. Features ship with tests, EN/DE copy and documentation together.
3. One provider failure must never block another connection.
4. Tokens, passwords, client secrets, chats and donation data never enter
   diagnostics or bug reports.
5. OBS WebSocket control stays on the private LAN; port `4455` is never exposed
   to the internet. An explicitly configured media output is technically and
   visibly separate from it.
6. Android background work starts only through a visible user action and always
   remains stoppable.
7. iOS stays foreground-only until a qualifying Apple service exists.
8. Provider sign-in, updates, security and the useful local core remain free.
9. Every camera/encoder adapter reports only proven capabilities; unknown
   devices receive no silent compatibility promise.
10. In distributed mode, camera nodes transmit directly to the target wherever
    possible so the controller is neither a bandwidth nor availability
    bottleneck.
11. Media source, transport, host, chat provider and OBS control remain separate
    failure domains.

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

### Gate C — Single-device media core

- [ ] Native camera and microphone source with an explicit permission flow
- [ ] Hardware encoding with documented resolution, FPS and bitrate tiers
- [ ] One freely configurable RTMPS target and one SRT target
- [ ] Separate profiles for local OBS and an external IRL host
- [ ] Protected stream credentials with no diagnostics or export leakage
- [ ] Understandable stream-health values for connection, packet loss, bitrate,
  temperature and battery
- [ ] Controlled reconnect and adaptive bitrate with visible user state
- [ ] Chat-first live surface with optional confidence frame and optional preview
- [ ] Transmission continues independently of whether preview is open
- [ ] At least one extended physical mobile/Wi-Fi handover test

Acceptance: one supported phone can transmit audio and video reliably to local
OBS and a controlled external IRL host. Stream credentials remain protected;
preview, chat or a provider failure cannot stop the media path.

### Gate D — Multi-device and IRL-host beta

- [ ] Roles for controller, camera node and optional program node
- [ ] Secure pairing, visible ownership and revocable device grants
- [ ] Multiple concurrent camera nodes with individual health cards
- [ ] Direct transport from each camera node to the target where supported
- [ ] Switch, mute, disconnect and controlled camera fallback actions
- [ ] Central program output on qualifying hardware without false promises
- [ ] RTMP only for an intentionally selected local/legacy target; prefer RTMPS
  externally
- [ ] Qualify SRTLA only with a compatible bonding/relay counterpart
- [ ] RIST profile with a compatible receiver and documented interoperability
- [ ] Extensible adapter model plus first USB/UVC and IP-camera qualification
- [ ] Publish a target/device compatibility matrix backed by physical tests

Acceptance: at least two physical sources can be monitored concurrently and
routed to a qualified target. Failure of one node, transport or host is visible
and does not take down independent sources, chat or control.

### Gate E — Release candidate

- [ ] Native Google OAuth activation and official YouTube live transport
- [ ] Kick app plus signature-verifying HTTPS/WSS relay, or visibly exclude
  Kick from the advertised scope
- [ ] Official YouTube/Kick artwork only after provider stability
- [ ] Final logo and minimum Android/iOS versions
- [x] Publish technical privacy information and the complete current-alpha
  data inventory
- [ ] Add media, device and host data to the inventory before distributing the
  first usable media build
- [ ] Add controller/contact, legal bases, data-subject rights and store
  disclosures before public beta
- [ ] Samsung, Pixel, Xiaomi, Huawei and iPhone device matrix
- [ ] Clean install and previous-internal-build upgrade
- [ ] Settings/profile migration and invalid/older import documents
- [ ] Android in-app update and confirmed iOS App Store handoff
- [ ] Protected store signing, internal tracks and TestFlight
- [ ] EN/DE store copy, real screenshots and support site
- [ ] Release, rollback, feature-disable and media emergency plans
- [ ] Accessibility, 200% text enlargement and touch targets
- [ ] License, infrastructure-cost and final monetization decision

Acceptance: every capability advertised on the site, store draft and in-app UI
works on at least one physical target and compatible receiver. The release
checklist is complete, all required checks are green, and return to the last
stable version is documented.

### Gate F — Public version 1.0

- [ ] Staged rollout with predefined stop criteria
- [ ] Visible known limitations and device/host compatibility matrix
- [ ] Public changelog, support path and security contact
- [ ] Monthly provider/OBS/host and quarterly Flutter review
- [ ] Regular dependency, relay and operating-cost review
- [ ] Pro functionality only after separate privacy, cost and purchase-
  verification approval

Acceptance: staged delivery remains stable and transmission quality,
maintenance, support and costs are sustainable.

### External blockers

| Blocker | Requires | Invalid substitute |
|---|---|---|
| Android qualification | Real device, test accounts, OBS computer | Unit/widget tests only |
| Media core | Camera/microphone access, hardware encoder, test targets | Simulated transmission alone |
| External IRL host | Controlled RTMPS/SRT receivers and credentials | OBS WebSocket as media transport |
| SRTLA/RIST | Compatible sender/relay/receiver counterparts | Protocol label without interoperability test |
| Device adapters | Physical USB/UVC/IP/vendor hardware and SDK rights | Generic compatibility claims |
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
- [x] Committed solo/hub/multi-device target experience
- [x] Visible separation of the current alpha and media core at `0%`
- [x] Planned signal path to local OBS or an external IRL host
- [x] RTMP/RTMPS, SRT, SRTLA and RIST strategy labelled as planned
- [x] Dedicated visual target for mobile field use
- [ ] Real screenshots after the beta UI stabilizes
- [ ] Device/compatibility matrix after physical tests
- [ ] Release-note view from approved releases only
- [ ] Privacy and support pages before public beta

Changes to operation, feature status, security or release boundaries update the
website in the same pull request.
