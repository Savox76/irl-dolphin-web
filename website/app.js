"use strict";

const translations = {
  de: {
    pageTitle: "IRL Dolphin — Control your stream on the go",
    pageDescription:
      "IRL Dolphin wird zur mobilen Produktions-, Übertragungs- und Interaktionszentrale für IRL-Streams – von einer Kamera bis zum verteilten Mehrgeräte-Setup.",
    skip: "Zum Inhalt springen",
    mainNav: "Hauptnavigation",
    languageLabel: "Sprache",
    themeToggle: "Darstellung wechseln",
    activeDevelopment: "Aktive Entwicklung",
    filterLabel: "Funktionen filtern",
    navFeatures: "Funktionen",
    navVision: "Zielbild",
    navSetup: "Anleitung",
    navRoadmap: "Vorversionsplan",
    navSecurity: "Sicherheit",
    navPrivacy: "Datenschutz",
    navDevices: "Geräte",
    privateAlpha: "Private Android-Alpha",
    heroTitle: "Dein IRL-Stream.<br><span>Eine Zentrale für jedes Setup.</span>",
    heroLead:
      "IRL Dolphin wächst zur mobilen Produktions-, Übertragungs- und Interaktionszentrale: Kameras und Geräte steuern, lokal oder zu einem IRL-Host senden und dabei den Chat im Mittelpunkt behalten.",
    startSetup: "Einrichtung starten",
    viewRoadmap: "Vorversionsplan ansehen",
    availability:
      "Aktuell nur als debug-signierter Testbuild für autorisierte Tester. Noch keine öffentliche Beta oder Store-Version.",
    projectStatus: "Projektstatus",
    alphaSnapshot: "Alpha-Snapshot",
    mvpFoundation: "MVP / technische Grundlage",
    usableFeatureScope: "Nutzbarer Funktionsumfang",
    mediaProgress: "Medienübertragung / Mehrgeräte",
    metricExplanation:
      "93 % messen die technische Alpha-Grundlage. 37 % zeigen den heute tatsächlich nutzbaren Steuerungs- und Interaktionsumfang. Der verbindlich geplante Medien- und Mehrgeräte-Kern wird getrennt mit 0 % ausgewiesen.",
    languages: "Sprachen",
    integrations: "Integrationen",
    activePaywalls: "aktive Paywalls",
    productPrinciple: "Produktprinzip",
    whyTitle: "Kontrolle ohne unnötige Abhängigkeiten",
    principleIndependentTitle: "Unabhängig",
    principleIndependentText: "Neu entwickelt, ohne fremden Code oder fremde Assets.",
    principleResilientTitle: "Ausfallsicher",
    principleResilientText: "Ein gestörter Anbieter darf die anderen nicht stoppen.",
    principleConsentTitle: "Transparent",
    principleConsentText: "Verbindungen, Berechtigungen und Updates benötigen deine Zustimmung.",
    visionKicker: "Produktvision · geplant",
    visionTitle: "Eine App vom Kamerasignal bis zum Chat",
    visionLead:
      "Die aktuelle Alpha legt die sichere Steuerungs- und Interaktionsbasis. Darauf entsteht eine erweiterbare Medienplattform für einzelne oder mehrere Geräte – ohne den Streamer auf mehrere Apps zu verteilen.",
    visionCaptionLabel: "Zielbild",
    visionCaption: "Chat-first im Live-Betrieb. Die eigene Vorschau bleibt optional.",
    visionSoloTitle: "Solo",
    visionSoloText: "Ein Smartphone nimmt auf, überträgt und zeigt Chat sowie Streamzustand in einer Oberfläche.",
    visionHubTitle: "Zentrale",
    visionHubText: "Ein Dolphin-Gerät steuert mehrere verbundene Kameras und erzeugt einen gemeinsamen Programmstream.",
    visionDistributedTitle: "Verteilt",
    visionDistributedText: "Mehrere Telefone, Kameras oder Encoder senden parallel zum OBS- oder IRL-Host; Dolphin koordiniert sie.",
    visionChatTitle: "Live-Ansicht: Interaktion zuerst",
    visionChatText:
      "Chat, TTS, Alerts, Geräte- und Verbindungswerte bleiben sichtbar. Ein Kontrollbild oder die Live-Vorschau wird nur bei Bedarf geöffnet.",
    routeBoardLabel: "Geplanter Übertragungsweg",
    routeSourcesLabel: "Quellen",
    routeSources: "Telefon · USB · IP · Encoder",
    routeCoreLabel: "Produktion",
    routeTargetLabel: "Ziel",
    routeTarget: "Lokales OBS · IRL-Host",
    routeOutputLabel: "Ausgabe",
    routeOutput: "Streamingdienste",
    protocolLineLabel: "Geplante Transporte",
    featureKicker: "Funktionsübersicht",
    featuresTitle: "Heute nutzbar. Morgen geplant.",
    featuresLead: "Aktuelle Alpha-Funktionen und die neue Medienplattform sind klar nach ihrem tatsächlichen Reifegrad getrennt.",
    filterAll: "Alle",
    filterReady: "Umgesetzt",
    filterLimited: "Eingeschränkt",
    filterPlanned: "Geplant",
    guideKicker: "DEU / ENG Anleitung",
    setupTitle: "Einrichten und sicher loslegen",
    setupLead:
      "Öffne die Schritte in der Reihenfolge, die du tatsächlich brauchst. Nicht verfügbare Anbieter und Medienfunktionen sind deutlich markiert.",
    beforeInstallTitle: "Vor der Installation",
    beforeInstallText:
      "Die aktuelle APK ist debug-signiert und ausschließlich für interne Gerätetests gedacht. Installiere sie nur aus dem zugehörigen privaten GitHub-Release.",
    roadmapKicker: "Masterplan bis zur Vorversion",
    roadmapTitle: "Von der Steuerungs-Alpha zur mobilen IRL-Plattform",
    roadmapLead:
      "Der neue Medien- und Mehrgeräte-Kern wird vor der öffentlichen Version über eigene Qualitäts-Gates aufgebaut. Ein Abschnitt gilt erst als fertig, wenn sein Abnahmekriterium erfüllt ist.",
    roadmapSourceTitle: "Verbindliche Detailplanung",
    roadmapSourceText:
      "Der vollständige zweisprachige Vorversions-Masterplan liegt zusätzlich im Repository und enthält Abnahmekriterien, Blocker und Dokumentationsaufgaben.",
    openMasterplan: "Masterplan öffnen",
    securityKicker: "Sicherheit & Datenschutz",
    securityTitle: "Für einen Stream gebaut – nicht für Datenhunger",
    securityLead:
      "Konten, Gerätesteuerung und Medienwege bleiben voneinander getrennt. Die lokale Diagnose speichert nur feste Fehlercodes im Arbeitsspeicher und lädt nichts hoch.",
    obsSafetyTitle: "OBS-Steuerung bleibt geschützt",
    obsSafetyText:
      "Port 4455 niemals im Router freigeben. Geplante Medienstreams zu einem bewusst konfigurierten OBS- oder IRL-Host bleiben technisch von der OBS-Fernsteuerung getrennt.",
    credentialsTitle: "Geschützte Zugangsdaten",
    credentialsText:
      "Tokens und Passwörter liegen im Android-Keystore bzw. iOS-Schlüsselbund und erscheinen nie in Diagnosen.",
    diagnosticsTitle: "Lokale Diagnose",
    diagnosticsText:
      "Maximal 200 strukturierte Ereignisse im Arbeitsspeicher, keine Nachrichten, Namen, URLs oder Uploads.",
    freeCoreTitle: "Freier lokaler Kern",
    freeCoreText:
      "Lokale OBS-Steuerung, Sicherheit, Updates und Anbieter-Anmeldung bleiben ohne Paywall.",
    privacyKicker: "Datenschutz & Daten",
    privacyTitle: "Klar getrennt: gespeichert, flüchtig, verbunden",
    privacyLead:
      "Die technische Alpha-Übersicht zeigt nachvollziehbar, welche Daten auf dem Gerät geschützt bleiben, nur während der Laufzeit existieren oder an einen bewusst verbundenen Dienst gehen.",
    privacyProtectedTitle: "Geschützt gespeichert",
    privacyProtectedText:
      "Sprache, Darstellung, TTS-Auswahl und ausdrücklich hinterlegte Verbindungsdaten nutzen geschützten Gerätespeicher.",
    privacyMemoryTitle: "Nur im Arbeitsspeicher",
    privacyMemoryText:
      "Chats, Spenden, TTS-Warteschlange, Diagnosen, Live-Zustände und lokale Geräte-Testläufe werden nicht als Historie gespeichert.",
    privacyNetworkTitle: "Begrenzte Netzwerkziele",
    privacyNetworkText:
      "Twitch und StreamElements nutzen dokumentierte sichere Endpunkte. Ein Gerätebericht erreicht GitHub nur nach öffentlicher Bestätigung und abschließendem Absenden durch den Tester.",
    privacyAbsentTitle: "Keine versteckte Sammlung",
    privacyAbsentText:
      "Keine Analyse, Werbung, Absturzübertragung, Cloud-Synchronisierung, Gerätekennung oder eigener App-Backenddienst.",
    privacyTechnicalNote:
      "Das vollständige technische Inventar nennt Zweck, Speicherort, Dauer, Empfänger und Löschmöglichkeit. Die endgültige juristische Datenschutzerklärung folgt vor der öffentlichen Beta mit echten Verantwortlichen- und Kontaktangaben.",
    openDataInventory: "Dateninventar öffnen",
    devicesKicker: "Physische Qualifizierung",
    devicesTitle: "Geprüfte Geräte – mit öffentlichem Nachweis",
    devicesLead:
      "Die Liste entsteht ausschließlich aus versionierten App-Berichten. Ein Eintrag erscheint erst nach automatischer Datenprüfung und einer separaten Maintainer-Freigabe.",
    devicesStepCapture: "Lokal messen",
    devicesStepCaptureText:
      "Auflösung, FPS, Bitrate, Encoder- und Laufzeitwerte werden ohne Medieninhalt erfasst.",
    devicesStepValidate: "Öffentlich validieren",
    devicesStepValidateText:
      "GitHub prüft Schema, Prüfsumme, Größenlimits und unbekannte Zusatzfelder.",
    devicesStepVerify: "Getrennt freigeben",
    devicesStepVerifyText:
      "Erst die Prüfung von Build-Herkunft und Messwerten erzeugt einen veröffentlichten Eintrag.",
    devicesBoundary:
      "Die aktuelle Qualifizierung betrifft nur den lokalen Kamera-zu-Hardware-H.264-Pfad. Netzwerk, OBS, IRL-Hosts und Streamingdienste sind damit ausdrücklich noch nicht bestätigt.",
    openDeviceReports: "Öffentliche Geräteberichte",
    devicesLoading: "Geprüfte Gerätedaten werden geladen…",
    devicesEmpty:
      "Noch kein Gerät wurde über diesen neuen Nachweisweg vollständig freigegeben.",
    devicesLoadFailed:
      "Die geprüften Gerätedaten konnten gerade nicht geladen werden.",
    deviceVerified: "Geprüft",
    deviceAppVersion: "App-Version",
    deviceEncoder: "Hardware-Encoder",
    deviceHighestProfile: "Höchstes bestätigtes lokales Profil",
    deviceRequestedBitrate: "Angefordert",
    deviceMeasuredProfile: "Gemessen",
    deviceRuns: "Erfolgreiche Läufe",
    deviceVerifiedOn: "Freigegeben",
    deviceEvidence: "Nachweis öffnen",
    suggestionsKicker: "Sinnvolle nächste Ergänzungen",
    suggestionsTitle: "Die Website wächst mit dem Produkt",
    suggestionsLead:
      "Diese Erweiterungen werden erst eingebaut, wenn der jeweilige Inhalt belastbar ist – so bleibt die Seite nützlich statt dekorativ.",
    faqTitle: "Kurz beantwortet",
    footerText: "Unabhängig entwickelt für IRL-Streamer.",
    repository: "Repository",
  },
  en: {
    pageTitle: "IRL Dolphin — Control your stream on the go",
    pageDescription:
      "IRL Dolphin is becoming the mobile production, transmission and interaction center for IRL streams, from one camera to distributed multi-device setups.",
    skip: "Skip to content",
    mainNav: "Main navigation",
    languageLabel: "Language",
    themeToggle: "Switch appearance",
    activeDevelopment: "Active development",
    filterLabel: "Filter features",
    navFeatures: "Features",
    navVision: "Vision",
    navSetup: "Guide",
    navRoadmap: "Pre-release plan",
    navSecurity: "Security",
    navPrivacy: "Privacy",
    navDevices: "Devices",
    privateAlpha: "Private Android alpha",
    heroTitle: "Your IRL stream.<br><span>One center for every setup.</span>",
    heroLead:
      "IRL Dolphin is growing into a mobile production, transmission and interaction center: control cameras and devices, send locally or to an IRL host, and keep chat at the center.",
    startSetup: "Start setup",
    viewRoadmap: "View pre-release plan",
    availability:
      "Currently available only as a debug-signed test build for authorized testers. It is not a public beta or store release.",
    projectStatus: "Project status",
    alphaSnapshot: "Alpha snapshot",
    mvpFoundation: "MVP / technical foundation",
    usableFeatureScope: "Usable feature scope",
    mediaProgress: "Media transmission / multi-device",
    metricExplanation:
      "93% measures the technical alpha foundation. 37% shows the control and interaction scope that is genuinely usable today. The committed media and multi-device core is reported separately at 0%.",
    languages: "languages",
    integrations: "integrations",
    activePaywalls: "active paywalls",
    productPrinciple: "Product principles",
    whyTitle: "Control without unnecessary dependencies",
    principleIndependentTitle: "Independent",
    principleIndependentText: "Built from scratch without third-party code or assets.",
    principleResilientTitle: "Resilient",
    principleResilientText: "One provider failure must never stop the others.",
    principleConsentTitle: "Transparent",
    principleConsentText: "Connections, permissions and updates require your consent.",
    visionKicker: "Product vision · planned",
    visionTitle: "One app from camera signal to chat",
    visionLead:
      "The current alpha establishes the secure control and interaction foundation. An extensible media platform for one or many devices will build on it, without making streamers juggle several apps.",
    visionCaptionLabel: "Target experience",
    visionCaption: "Chat-first while live. Your own preview remains optional.",
    visionSoloTitle: "Solo",
    visionSoloText: "One phone captures, transmits and shows chat plus stream health in a single surface.",
    visionHubTitle: "Hub",
    visionHubText: "One Dolphin device controls multiple connected cameras and produces one program stream.",
    visionDistributedTitle: "Distributed",
    visionDistributedText: "Multiple phones, cameras or encoders transmit in parallel to OBS or an IRL host while Dolphin coordinates them.",
    visionChatTitle: "Live surface: interaction first",
    visionChatText:
      "Chat, TTS, alerts, device and connection health stay visible. A confidence frame or live preview opens only when needed.",
    routeBoardLabel: "Planned transmission path",
    routeSourcesLabel: "Sources",
    routeSources: "Phone · USB · IP · encoder",
    routeCoreLabel: "Production",
    routeTargetLabel: "Target",
    routeTarget: "Local OBS · IRL host",
    routeOutputLabel: "Output",
    routeOutput: "Streaming services",
    protocolLineLabel: "Planned transports",
    featureKicker: "Feature overview",
    featuresTitle: "Available today. Planned for tomorrow.",
    featuresLead: "Current alpha capabilities and the new media platform are clearly separated by their real maturity.",
    filterAll: "All",
    filterReady: "Implemented",
    filterLimited: "Limited",
    filterPlanned: "Planned",
    guideKicker: "DEU / ENG guide",
    setupTitle: "Configure it and start safely",
    setupLead:
      "Open the steps in the order you actually need. Providers and media capabilities that are not available yet are clearly identified.",
    beforeInstallTitle: "Before installation",
    beforeInstallText:
      "The current APK is debug-signed and intended only for internal device testing. Install it only from its private GitHub release.",
    roadmapKicker: "Pre-release master plan",
    roadmapTitle: "From control alpha to mobile IRL platform",
    roadmapLead:
      "The new media and multi-device core will pass its own quality gates before public release. A stage is complete only after its acceptance gate passes.",
    roadmapSourceTitle: "Authoritative detailed plan",
    roadmapSourceText:
      "The complete bilingual pre-release master plan is also stored in the repository with acceptance criteria, blockers and documentation work.",
    openMasterplan: "Open master plan",
    securityKicker: "Security & privacy",
    securityTitle: "Built for a stream, not for collecting data",
    securityLead:
      "Accounts, device control and media paths remain isolated. Local diagnostics retain only fixed error codes in memory and upload nothing.",
    obsSafetyTitle: "OBS control stays protected",
    obsSafetyText:
      "Never forward port 4455 on the router. Planned media streams to an explicitly configured OBS or IRL host remain technically separate from OBS remote control.",
    credentialsTitle: "Protected credentials",
    credentialsText:
      "Tokens and passwords stay in Android Keystore or iOS Keychain storage and never appear in diagnostics.",
    diagnosticsTitle: "Local diagnostics",
    diagnosticsText:
      "At most 200 structured in-memory events, with no messages, names, URLs or uploads.",
    freeCoreTitle: "Free local core",
    freeCoreText:
      "Local OBS control, security, updates and provider sign-in stay outside any paywall.",
    privacyKicker: "Privacy & data",
    privacyTitle: "Clearly separated: stored, volatile, connected",
    privacyLead:
      "The technical alpha overview shows which data stays protected on the device, exists only at runtime or reaches a deliberately connected service.",
    privacyProtectedTitle: "Protected storage",
    privacyProtectedText:
      "Language, appearance, TTS choices and explicitly saved connection data use protected device storage.",
    privacyMemoryTitle: "Memory only",
    privacyMemoryText:
      "Chats, donations, the TTS queue, diagnostics, live state and local device-test runs are not retained as history.",
    privacyNetworkTitle: "Bounded destinations",
    privacyNetworkText:
      "Twitch and StreamElements use documented secure endpoints. A device report reaches GitHub only after public confirmation and final submission by the tester.",
    privacyAbsentTitle: "No hidden collection",
    privacyAbsentText:
      "No analytics, advertising, crash upload, cloud sync, device identifier or app-operated backend service.",
    privacyTechnicalNote:
      "The complete technical inventory lists purpose, storage, retention, recipient and deletion control. The final legal privacy policy follows before public beta with real controller and contact details.",
    openDataInventory: "Open data inventory",
    devicesKicker: "Physical qualification",
    devicesTitle: "Verified devices, backed by public evidence",
    devicesLead:
      "This list is built only from versioned app reports. An entry appears after automated data validation and a separate maintainer approval.",
    devicesStepCapture: "Measure locally",
    devicesStepCaptureText:
      "Resolution, FPS, bitrate, encoder and runtime metrics are captured without media content.",
    devicesStepValidate: "Validate publicly",
    devicesStepValidateText:
      "GitHub checks the schema, checksum, size limits and unknown extra fields.",
    devicesStepVerify: "Approve separately",
    devicesStepVerifyText:
      "Only a review of build provenance and measurements creates a published entry.",
    devicesBoundary:
      "Current qualification covers only the local camera-to-hardware-H.264 path. It explicitly does not confirm networking, OBS, IRL hosts or streaming services yet.",
    openDeviceReports: "Public device reports",
    devicesLoading: "Loading verified device data…",
    devicesEmpty:
      "No device has completed this new evidence and approval path yet.",
    devicesLoadFailed: "Verified device data could not be loaded right now.",
    deviceVerified: "Verified",
    deviceAppVersion: "App version",
    deviceEncoder: "Hardware encoder",
    deviceHighestProfile: "Highest confirmed local profile",
    deviceRequestedBitrate: "Requested",
    deviceMeasuredProfile: "Measured",
    deviceRuns: "Successful runs",
    deviceVerifiedOn: "Approved",
    deviceEvidence: "Open evidence",
    suggestionsKicker: "Useful next additions",
    suggestionsTitle: "The website grows with the product",
    suggestionsLead:
      "These additions arrive only when their content is reliable, keeping the site useful instead of decorative.",
    faqTitle: "Quick answers",
    footerText: "Built independently for IRL streamers.",
    repository: "Repository",
  },
};

const content = {
  de: {
    status: { ready: "Umgesetzt", limited: "Eingeschränkt", planned: "Geplant" },
    features: [
      {
        symbol: "UI",
        status: "ready",
        title: "Zweisprachige Oberfläche",
        text: "Deutsch und Englisch, Gerätesprache als Standard sowie System-, Hell- und Dunkelmodus.",
        detail: "Auswahl und Navigation werden nach einem Neustart wiederhergestellt.",
      },
      {
        symbol: "TW",
        status: "limited",
        title: "Twitch Live-Chat",
        text: "Offizielle Anmeldung, Live-Chat, Senden, Badges, Emotes sowie bestätigtes Löschen, Timeout und Bann.",
        detail: "Implementiert; reale Langzeit- und Gerätequalifizierung steht noch aus.",
      },
      {
        symbol: "UC",
        status: "limited",
        title: "Unified Chat",
        text: "Anbietergetrennte, zeitlich sortierte Nachrichten mit eigenen Zuständen für Twitch, YouTube und Kick.",
        detail: "Twitch ist live nutzbar; Google-OAuth und Kick-Relay fehlen noch.",
      },
      {
        symbol: "OB",
        status: "limited",
        title: "OBS Remote",
        text: "Lokale WebSocket-v5-Verbindung, Szenen, Favoriten, Schnellwechsel, Start/Stopp, Quellen und Leistungswerte.",
        detail: "Automatisiert geprüft; echter On-Air-Test auf Geräten ist noch offen.",
      },
      {
        symbol: "SE",
        status: "limited",
        title: "StreamElements",
        text: "Geschützte Astro-Verbindung für aktuelle Aktivitäten und Spenden mit begrenzter Anzeige im Arbeitsspeicher.",
        detail: "Oberfläche und Protokoll stehen; Qualifizierung mit realem Kanal folgt.",
      },
      {
        symbol: "TT",
        status: "limited",
        title: "Chat-Sprachausgabe",
        text: "Opt-in TTS für ausschließlich neue Nachrichten, mit Anbieterfiltern, Nutzernamen-Option und begrenzter Warteschlange.",
        detail: "Bluetooth, Anrufe und Navigationsaudio müssen physisch getestet werden.",
      },
      {
        symbol: "BG",
        status: "limited",
        title: "Android-Hintergrundsitzung",
        text: "Nur bewusst gestartete, jederzeit stoppbare Sitzung mit dauerhafter Benachrichtigung für aktive Chats und TTS.",
        detail: "Android 15/16 und Huawei-Energiemanagement sind noch zu qualifizieren.",
      },
      {
        symbol: "iO",
        status: "limited",
        title: "iOS im Vordergrund",
        text: "Chat und TTS funktionieren bei aktiver App; es wird kein unpassender Apple-Hintergrundmodus vorgetäuscht.",
        detail: "Kontinuierlicher Hintergrundbetrieb bleibt bewusst deaktiviert.",
      },
      {
        symbol: "EX",
        status: "ready",
        title: "Einstellungen übertragen",
        text: "Versionierter Export/Import für Sprache, Darstellung und TTS-Auswahl mit strenger Feldprüfung.",
        detail: "Konten, Tokens, OBS-Profile, Favoriten, Diagnosen und Nachrichten sind ausgeschlossen.",
      },
      {
        symbol: "DX",
        status: "ready",
        title: "Lokale Diagnose",
        text: "Feste, datenschutzfreundliche Ereigniscodes helfen bei Fehlern, ohne Chat oder Zugangsdaten zu speichern.",
        detail: "Flüchtig, auf 200 Einträge begrenzt und niemals hochgeladen.",
      },
      {
        symbol: "UP",
        status: "limited",
        title: "Sichere Updates",
        text: "Technische Update-Grenze und Bestätigungsdialog mit „Später“ oder „Jetzt aktualisieren“ sind vorhanden.",
        detail: "Store-gesteuerte Auslieferung folgt erst in der Beta-Phase.",
      },
      {
        symbol: "TX",
        status: "planned",
        title: "Kamera- und Medienkern",
        text: "Kamera- und Audioquellen aufnehmen, per Hardware encodieren und unabhängig von der optionalen Vorschau übertragen.",
        detail: "Noch nicht implementiert; der erste vertikale Testpfad beginnt mit einer Telefonkamera und einem frei konfigurierbaren Ziel.",
      },
      {
        symbol: "MD",
        status: "planned",
        title: "Mehrgeräte-Regie",
        text: "Solo-, Zentralen- und verteilte Setups mit mehreren gleichzeitig aktiven Telefonen, Kameras oder Encodern.",
        detail: "Kamerageräte sollen direkt zum Ziel senden, damit das steuernde Telefon nicht zum Bandbreiten-Flaschenhals wird.",
      },
      {
        symbol: "IH",
        status: "planned",
        title: "OBS- und IRL-Host-Ziele",
        text: "Lokale OBS-Setups und externe IRL-Hoster über RTMP/RTMPS, SRT, SRTLA oder RIST als getrennte Übertragungsprofile.",
        detail: "Protokolle werden einzeln implementiert, physisch belastet und nur bei nachgewiesener Kompatibilität freigegeben.",
      },
      {
        symbol: "DA",
        status: "planned",
        title: "Erweiterbare Geräteadapter",
        text: "Telefonkameras, USB/UVC-, IP- und herstellerspezifische Geräte melden ihre tatsächlich verfügbaren Steuerfunktionen.",
        detail: "Neue Gerätefamilien können später ergänzt werden, ohne die gemeinsame Live-Oberfläche neu zu bauen.",
      },
      {
        symbol: "RB",
        status: "planned",
        title: "Remote Bridge",
        text: "Spätere sichere OBS-Fernverbindung, ohne einen OBS-Port direkt im Internet freizugeben.",
        detail: "Erst nach unabhängiger Kryptografie-, Datenschutz- und Kostenprüfung.",
      },
    ],
    guides: [
      {
        title: "Alpha installieren",
        subtitle: "Nur für autorisierte Android-Gerätetests",
        steps: [
          "Öffne im privaten GitHub-Repository den Release <code>v0.1.0-alpha.3</code>.",
          "Lade ausschließlich die dort angehängte Android-Debug-APK herunter und vergleiche bei Bedarf den in den Release Notes genannten SHA-256-Wert.",
          "Erlaube die Installation aus dieser Quelle nur für den Installationsvorgang und starte anschließend IRL Dolphin.",
          "Prüfe Startbildschirm, Sprache sowie Hell-/Dunkelmodus, bevor du Konten verbindest.",
        ],
        note: "Die Alpha ist nicht öffentlich verteilt, nicht store-signiert und nicht für den täglichen Produktiveinsatz freigegeben.",
      },
      {
        title: "Twitch verbinden",
        subtitle: "Live-Chat, Senden und Moderation",
        steps: [
          "Öffne <strong>Verbindungen → Twitch → Verbinden</strong>.",
          "Tippe auf <strong>Twitch öffnen</strong> oder kopiere den einmaligen Aktivierungscode.",
          "Melde dich auf der offiziellen Twitch-Seite an und bestätige die angezeigten Chat- und Moderationsrechte.",
          "Kehre zu IRL Dolphin zurück. Der verbundene Kontoname wird angezeigt und der Live-Chat startet isoliert von anderen Anbietern.",
          "Öffne <strong>Chat</strong>, um Nachrichten zu lesen oder zu senden. Moderationsaktionen verlangen immer eine eigene Bestätigung.",
        ],
        note: "Wurde Twitch vor Einführung der Moderationsrechte verbunden, muss das Konto einmal getrennt und neu autorisiert werden.",
      },
      {
        title: "OBS Studio lokal einrichten",
        subtitle: "Szenen, Quellen, Streamzustand und Schnellzugriffe",
        steps: [
          "Nutze OBS Studio 28 oder neuer. Öffne <strong>Werkzeuge → WebSocket-Servereinstellungen</strong>.",
          "Aktiviere den WebSocket-Server, lasse die Authentifizierung eingeschaltet und vergib ein starkes eigenes Passwort. Standardport ist <code>4455</code>.",
          "Ermittle die private LAN-Adresse des Rechners, zum Beispiel <code>192.168.1.20</code>. Telefon und Rechner müssen im selben vertrauenswürdigen Netz sein.",
          "Öffne in IRL Dolphin <strong>Verbindungen → OBS Studio → Einrichten</strong>, trage Adresse, Port und Passwort ein und wähle <strong>Speichern und verbinden</strong>.",
          "Markiere häufige Szenen als Favoriten. Sichtbare Favoriten erscheinen als One-Tap-Aktionen im Dashboard; der vollständige Szenenwechsel bleibt bestätigt.",
          "Unter <strong>Quellen</strong> steuerst du mit Bestätigung Audio-Mute und Sichtbarkeit der aktuellen Szene. <strong>Diagnose aktualisieren</strong> liest Stream- und Leistungswerte, ändert aber keine OBS-Konfiguration.",
        ],
        note: "Port 4455 niemals im Router weiterleiten. Gast-WLAN, Client-Isolation oder die Desktop-Firewall können die lokale Verbindung blockieren.",
      },
      {
        title: "StreamElements verbinden",
        subtitle: "Aktivitäten und Spenden über Astro",
        steps: [
          "Wähle im StreamElements-Dashboard zuerst den richtigen Kanal und kopiere das zugehörige Token.",
          "Öffne <strong>Verbindungen → StreamElements → Einrichten</strong>.",
          "Wähle den Token-Typ; <strong>JWT</strong> ist empfohlen. Trage einen Kanalraum nur ein, wenn Support oder Integration ihn ausdrücklich verlangen.",
          "Aktiviere <strong>Auf diesem Gerät merken</strong> nur auf deinem eigenen Gerät und tippe <strong>Sicher verbinden</strong>.",
          "Das Profil wird erst nach bestätigten Live-Abonnements geschützt gespeichert. Neue Aktivitäten und Spenden erscheinen nur begrenzt im Arbeitsspeicher.",
        ],
        note: "Tokens niemals in Screenshots oder Fehlerberichte kopieren. Reale Konto- und Langzeittests sind für die Beta noch offen.",
      },
      {
        title: "Chat vorlesen lassen",
        subtitle: "TTS bleibt aus, bis du es einschaltest",
        steps: [
          "Öffne <strong>Einstellungen → Chat vorlesen</strong> und aktiviere TTS ausdrücklich.",
          "Lege fest, ob Nutzernamen angesagt werden und welche Anbieter vorgelesen werden dürfen.",
          "Nur neu eintreffende Live-Nachrichten werden gesprochen. Bereits vorhandene oder historische Nachrichten bleiben still.",
          "Prüfe Lautstärke und Audioausgabe zunächst ohne laufenden Stream; deaktiviere TTS jederzeit im selben Bereich.",
        ],
        note: "Die Auswahl wird wiederhergestellt, aber alte Nachrichten und die Warteschlange werden niemals gespeichert oder nachgesprochen.",
      },
      {
        title: "Android-Hintergrundsitzung",
        subtitle: "Bewusst starten, jederzeit stoppen",
        steps: [
          "Verbinde zuerst die gewünschten Anbieter und aktiviere TTS nur bei Bedarf.",
          "Öffne <strong>Einstellungen → Stream-Sitzung im Hintergrund</strong> und wähle <strong>Sitzung starten</strong>.",
          "Erlaube auf Android 13 oder neuer die Benachrichtigung, damit die laufende Sitzung sichtbar bleibt. Bei Ablehnung bleibt sie in der App und unter Androids aktiven Apps stoppbar.",
          "Beende die Sitzung über <strong>Sitzung beenden</strong> oder direkt über die Aktion in der dauerhaften Benachrichtigung.",
        ],
        note: "Die Sitzung startet nie automatisch nach App-Start, Neustart oder Force Stop. Android 15+ begrenzt dataSync-Hintergrundarbeit auf insgesamt sechs Stunden je 24 Stunden.",
      },
      {
        title: "Einstellungen und Diagnose",
        subtitle: "Übertragen, prüfen, datensparsam helfen",
        steps: [
          "Unter <strong>Einstellungen → Einstellungen übertragen</strong> zeigt <strong>Export anzeigen</strong> einen kleinen JSON-Text.",
          "Füge diesen Text auf einer anderen Installation unter <strong>Importieren</strong> ein. Sprache, Darstellung und TTS-Auswahl werden gemeinsam ersetzt.",
          "Bei Verbindungsproblemen öffne <strong>Lokale Diagnose → Anzeigen</strong> und notiere ausschließlich den festen Fehlercode.",
          "Leere die Diagnose bei Bedarf. Alle Einträge verschwinden ohnehin, sobald der App-Prozess endet.",
        ],
        note: "Export und Diagnose enthalten keine Konten, Zugangsdaten, OBS-Profile, Favoriten, Nachrichten oder Spendendaten.",
      },
      {
        title: "YouTube und Kick: aktueller Stand",
        subtitle: "Noch nicht als echte Kontoverbindung freigegeben",
        steps: [
          "YouTube besitzt bereits Chat-Modelle und isolierte Zustände; die native Google-OAuth-Aktivierung und der offizielle Streaming-Transport fehlen noch.",
          "Kick besitzt Parser, Zustände und eine sichere WSS-Grenze. Für den Betrieb werden eine registrierte Kick-App und ein signaturprüfendes HTTPS/WSS-Relay benötigt.",
          "Beide Anbieter bleiben in der Alpha als nicht produktiv oder Demo gekennzeichnet. Füge keine Client-Secrets in die App ein.",
        ],
        note: "Twitch, OBS und StreamElements können unabhängig weiterlaufen, auch wenn YouTube oder Kick nicht verfügbar sind.",
      },
      {
        title: "Kameras, Mehrgeräte und IRL-Hosts",
        subtitle: "Verbindliches Zielbild, noch nicht Bestandteil der Alpha",
        steps: [
          "Der geplante Medienkern nimmt Telefon-, USB/UVC-, IP- oder später herstellerspezifische Kameraquellen auf und encodiert sie hardwaregestützt.",
          "Ein Gerät kann allein senden; alternativ koordiniert ein Steuergerät mehrere Kamerageräte, die direkt zu OBS oder einem externen IRL-Host übertragen.",
          "RTMPS und SRT bilden den ersten Zielpfad. RTMP folgt für bewusst gewählte lokale/ältere Ziele; SRTLA und RIST erst nach eigener Kompatibilitäts- und Belastungsprüfung.",
          "Im Live-Betrieb stehen Chat, TTS, Alerts und Verbindungswerte im Vordergrund. Kontrollbild und Vorschau bleiben optional.",
        ],
        note: "Diese Funktionen sind noch nicht implementiert. Trage in der aktuellen Alpha keine Stream-Keys ein und öffne weder OBS-WebSocket noch andere lokale Ports zum Internet.",
      },
    ],
    roadmap: [
      {
        state: "current",
        label: "Erreicht",
        title: "Alpha-Grundlage · v0.1.0-alpha.3",
        text: "Der technische Kern und die erste intern installierbare Android-Version stehen.",
        tasks: [
          "DE/EN, neutrale Hell-/Dunkelansicht und Zustandswiederherstellung",
          "Twitch, lokales OBS, StreamElements, TTS und sichere lokale Diagnose",
          "Automatisierte Analyse, Tests und Android-Debug-Build aus grünem main",
          "Bewusst gestartete Android-Hintergrundsitzung; iOS bleibt ehrlich foreground-only",
        ],
        gate: "Gate erfüllt: reproduzierbarer, automatisch geprüfter interner Build.",
      },
      {
        state: "current",
        label: "Nächster Schwerpunkt",
        title: "Physische Alpha-Qualifizierung",
        text: "Die implementierten Funktionen werden auf echten Geräten und mit echten Konten belastet.",
        tasks: [
          "Huawei T15 Pro / Android 16: Installation, Kaltstart, Rotation, Energiemanagement",
          "Twitch-Anmeldung, Erneuerung, Live-Chat, Moderation und Netzwechsel",
          "OBS im echten LAN: Szenen, Quellen, Start/Stopp und plausible Leistungswerte",
          "TTS mit Bluetooth, Telefonanruf, Navigation und App-Fortsetzung",
          "Android-Hintergrundsitzung inklusive Benachrichtigung, Force Stop und Zeitlimit",
        ],
        gate: "Abnahme: keine kritischen Fehler; alle Befunde dokumentiert und als Regression abgesichert.",
      },
      {
        state: "next",
        label: "Danach",
        title: "Medienkern · Einzelgerät",
        text: "Der erste belastbare Ende-zu-Ende-Pfad macht Dolphin vom Steuergerät zur echten mobilen IRL-Sendeeinheit.",
        tasks: [
          "Native Kamera-/Audioquellen und Hardware-Encoding hinter einer stabilen Mediengrenze",
          "RTMPS- und SRT-Zielprofile für lokales OBS oder einen frei gewählten IRL-Host",
          "Adaptive Bitrate, Wiederverbindung sowie sichtbare Latenz-, Paketverlust- und Temperaturwerte",
          "Chat-first-Liveansicht; Kontrollbild und laufende Vorschau bleiben optional",
          "Gerätetests mit Kamera, Mikrofon, Netzwechsel, Displayrotation und längerer Laufzeit",
        ],
        gate: "Abnahme: ein einzelnes Gerät überträgt stabil zu OBS und IRL-Host, ohne dass Chat oder Steuerung ausfallen.",
      },
      {
        state: "later",
        label: "Aufbauend",
        title: "Mehrgeräte- und Host-Beta",
        text: "Dolphin koordiniert mehrere Quellen gleichzeitig, ohne das Steuergerät zum Medien-Flaschenhals zu machen.",
        tasks: [
          "Rollen Solo, Steuergerät und Kameragerät mit sicherer gegenseitiger Kopplung",
          "Parallele Direktübertragung jedes Kamerageräts zu OBS oder IRL-Host",
          "Gerätekacheln mit Status, Akku, Temperatur, Bitrate und optionalem Kontrollbild",
          "Umschaltung, Standby-Quelle, Verbindungsverlust und kontrollierter Fallback",
          "SRTLA für gebündelte Netze und RIST als zusätzlich qualifizierter Transport",
        ],
        gate: "Abnahme: mindestens zwei aktive Quellen lassen sich sicher überwachen, umschalten und getrennt wiederverbinden.",
      },
      {
        state: "later",
        label: "Beta-Umfang",
        title: "Geräte- und Provider-Erweiterung",
        text: "Die gemeinsame Oberfläche wächst durch Adapter, ohne den stabilen Medien- oder Chatkern zu verzweigen.",
        tasks: [
          "USB/UVC-, IP- und ausgewählte herstellerspezifische Kameraadapter",
          "Native Google-OAuth-Aktivierung und offizieller YouTube-Live-Transport",
          "Kick-App und Relay sicher betreiben oder Kick für die Beta eindeutig ausnehmen",
          "Finales Logo, minimale OS-Versionen, Supportweg und juristische Datenschutzangaben",
          "Android- und iOS-Kompatibilitätsmatrix für Quellen, Transporte und Hintergrundgrenzen",
        ],
        gate: "Abnahme: jede beworbene Kombination ist physisch geprüft oder sichtbar als nicht unterstützt markiert.",
      },
      {
        state: "later",
        label: "Release Candidate",
        title: "Store- und Upgrade-Qualifizierung",
        text: "Der Release Candidate konzentriert sich auf sichere Auslieferung und reproduzierbare Updates.",
        tasks: [
          "Gerätematrix: Samsung, Pixel, Xiaomi und repräsentative iPhones",
          "Geschützte Store-Signierung, interne Tracks und TestFlight",
          "Saubere Installation, Upgrade vom Vorgänger und Einstellungen-Migration",
          "Bilinguale Store-Texte, Screenshots, Supportseite und Rollback-Plan",
        ],
        gate: "Abnahme: Release-Checkliste vollständig, keine offenen Blocker, Rollback erprobt.",
      },
      {
        state: "later",
        label: "Öffentlich",
        title: "v1.0 und laufende Pflege",
        text: "Die erste öffentliche Version wird gestuft verteilt und dauerhaft gepflegt.",
        tasks: [
          "Gestufter Rollout mit messbaren Stop-/Rollback-Kriterien",
          "Monatliche Provider-Kompatibilitätsprüfung und quartalsweise Flutter-Upgrades",
          "Öffentliche bekannte Einschränkungen, Changelog und Supportweg",
          "Pro-Funktionen erst nach separater Kosten-, Datenschutz- und Kaufprüfung",
        ],
        gate: "Abnahme: stabiler Rollout und ein dauerhaft tragfähiger Wartungsprozess.",
      },
    ],
    suggestions: [
      ["Quellen-Kompatibilitätsmatrix", "Getestete Telefon-, USB/UVC-, IP- und Encoder-Quellen mit den tatsächlich verfügbaren Steuerfunktionen."],
      ["IRL-Host-Kompatibilitätsmatrix", "Nachgewiesene RTMP/RTMPS-, SRT-, SRTLA- und RIST-Ziele mit Datum, Betriebsart und bekannten Grenzen."],
      ["Versionsgesteuerte Release Notes", "Automatische, lesbare Übersicht aus freigegebenen GitHub-Releases – ohne Alpha als öffentliche Beta darzustellen."],
      ["Tester-Feedback mit Datenschutzcheck", "Vorbefüllter Fehlerbericht, der vor dem Absenden an Tokens, Chats und OBS-Passwörter erinnert."],
      ["Echte App-Screenshots", "Erst nach stabiler Beta-Oberfläche, dann für jede Sprache und beide Darstellungen."],
    ],
    faq: [
      ["Kann ich IRL Dolphin bereits herunterladen?", "Nur als autorisierter Tester aus dem privaten GitHub-Release. Eine öffentliche Beta oder Store-Version gibt es noch nicht."],
      ["Kann IRL Dolphin bereits Kameras übertragen?", "Noch nicht. Die aktuelle Alpha enthält die Steuerungs- und Interaktionsgrundlage. Kameraaufnahme, Encoding und RTMPS/SRT/SRTLA/RIST werden als eigener Medienkern aufgebaut und bleiben bis zur Gerätequalifizierung klar als geplant markiert."],
      ["Kann ich mehrere Geräte gleichzeitig nutzen?", "Das ist verbindlich vorgesehen. Mehrere Telefone, Kameras oder Encoder sollen parallel direkt zu OBS oder einem IRL-Host senden und zentral in Dolphin überwacht sowie umgeschaltet werden."],
      ["Muss ich mein eigenes Kamerabild dauerhaft ansehen?", "Nein. Die geplante Live-Ansicht ist Chat-first. Ein kleines Kontrollbild oder die laufende Vorschau wird nur bei Bedarf geöffnet; die Übertragung läuft davon unabhängig weiter."],
      ["Brauche ich einen kostenpflichtigen Dienst?", "Nein für den aktuellen lokalen Kern. OBS im LAN, Twitch-Anmeldung, Updates und Sicherheit sollen frei bleiben. Ein späteres Kick- oder Remote-Relay verursacht jedoch Betriebskosten und wird separat entschieden."],
      ["Ist ein externer IRL-Host dasselbe wie eine offene OBS-Verbindung?", "Nein. Ein bewusst konfigurierter Medienstream zum Hoster ist vom OBS-WebSocket getrennt. Port 4455 bleibt geschlossen; eine spätere Fernsteuerung benötigt eine authentifizierte Bridge."],
      ["Warum funktioniert die Hintergrundsitzung nicht auf iOS?", "Weil Chat-WebSockets und gelegentliche TTS keine passende Apple-Hintergrundberechtigung darstellen. IRL Dolphin bleibt deshalb auf iOS ehrlich im Vordergrund, bis ein zulässiger Nutzer-Dienst existiert."],
      ["Werden Chatnachrichten oder Zugangsdaten gesammelt?", "Nein. Die lokale Diagnose kann keine Nachrichten, Namen, Tokens, URLs oder Rohfehler aufnehmen und wird beim Ende des App-Prozesses gelöscht."],
      ["Sind YouTube und Kick fertig?", "Nein. YouTube benötigt noch native Google-OAuth-Aktivierung; Kick zusätzlich eine registrierte App und ein sicheres Relay. Beide sind klar als eingeschränkt oder Demo markiert."],
    ],
  },
  en: {
    status: { ready: "Implemented", limited: "Limited", planned: "Planned" },
    features: [
      {
        symbol: "UI",
        status: "ready",
        title: "Bilingual interface",
        text: "English and German, device-language default, plus system, light and dark appearance.",
        detail: "Language, appearance and navigation are restored after restart.",
      },
      {
        symbol: "TW",
        status: "limited",
        title: "Twitch live chat",
        text: "Official sign-in, live chat, sending, badges, emotes, plus confirmed delete, timeout and ban actions.",
        detail: "Implemented; real-device and long-session qualification is still pending.",
      },
      {
        symbol: "UC",
        status: "limited",
        title: "Unified Chat",
        text: "Provider-isolated, time-ordered messages with independent Twitch, YouTube and Kick states.",
        detail: "Twitch is live; Google OAuth and the Kick relay are still pending.",
      },
      {
        symbol: "OB",
        status: "limited",
        title: "OBS Remote",
        text: "Local WebSocket v5, scenes, favorites, quick switching, start/stop, sources and performance metrics.",
        detail: "Covered by automation; physical on-air device testing is still pending.",
      },
      {
        symbol: "SE",
        status: "limited",
        title: "StreamElements",
        text: "Protected Astro connection for current activities and donations with bounded in-memory display.",
        detail: "Protocol and UI are present; real-channel qualification comes next.",
      },
      {
        symbol: "TT",
        status: "limited",
        title: "Chat speech",
        text: "Opt-in TTS for new messages only, with provider filters, username option and a bounded queue.",
        detail: "Bluetooth, calls and navigation-audio testing remains pending.",
      },
      {
        symbol: "BG",
        status: "limited",
        title: "Android background session",
        text: "Explicitly started, always-stoppable session with an ongoing notification for active chat and TTS.",
        detail: "Android 15/16 and Huawei power-management qualification remains pending.",
      },
      {
        symbol: "iO",
        status: "limited",
        title: "Foreground iOS support",
        text: "Chat and TTS work while the app is active; IRL Dolphin does not claim an unrelated Apple background mode.",
        detail: "Continuous iOS background operation deliberately remains disabled.",
      },
      {
        symbol: "EX",
        status: "ready",
        title: "Portable settings",
        text: "Versioned export/import for language, appearance and TTS choices with strict field validation.",
        detail: "Accounts, tokens, OBS profiles, favorites, diagnostics and messages are excluded.",
      },
      {
        symbol: "DX",
        status: "ready",
        title: "Local diagnostics",
        text: "Fixed privacy-safe event codes help troubleshoot without retaining chat or credentials.",
        detail: "Volatile, capped at 200 entries and never uploaded.",
      },
      {
        symbol: "UP",
        status: "limited",
        title: "Safe updates",
        text: "An update boundary and confirmation dialog with Later or Update now choices are implemented.",
        detail: "Store-managed delivery arrives during beta preparation.",
      },
      {
        symbol: "TX",
        status: "planned",
        title: "Camera and media core",
        text: "Capture camera and audio sources, use hardware encoding and transmit independently from the optional preview.",
        detail: "Not implemented yet; the first vertical path starts with one phone camera and a configurable target.",
      },
      {
        symbol: "MD",
        status: "planned",
        title: "Multi-device production",
        text: "Solo, hub and distributed setups with multiple simultaneously active phones, cameras or encoders.",
        detail: "Camera nodes should transmit directly to the target so the controller phone never becomes the bandwidth bottleneck.",
      },
      {
        symbol: "IH",
        status: "planned",
        title: "OBS and IRL host targets",
        text: "Local OBS setups and external IRL hosts through separate RTMP/RTMPS, SRT, SRTLA or RIST transmission profiles.",
        detail: "Each protocol is implemented, physically stressed and released only after compatibility is proven.",
      },
      {
        symbol: "DA",
        status: "planned",
        title: "Extensible device adapters",
        text: "Phone cameras, USB/UVC, IP and vendor-specific devices expose only the controls they actually support.",
        detail: "Additional device families can be added later without rebuilding the shared live surface.",
      },
      {
        symbol: "RB",
        status: "planned",
        title: "Remote Bridge",
        text: "A future secure OBS remote path without exposing the OBS port directly to the internet.",
        detail: "Only after independent cryptography, privacy and cost review.",
      },
    ],
    guides: [
      {
        title: "Install the alpha",
        subtitle: "Authorized Android device testing only",
        steps: [
          "Open release <code>v0.1.0-alpha.3</code> in the private GitHub repository.",
          "Download only the attached Android debug APK and, when needed, compare it with the SHA-256 value in the release notes.",
          "Allow installation from that source only for the install, then launch IRL Dolphin.",
          "Check the launch screen, language and light/dark appearance before connecting accounts.",
        ],
        note: "The alpha is not publicly distributed, store-signed or approved for everyday production use.",
      },
      {
        title: "Connect Twitch",
        subtitle: "Live chat, sending and moderation",
        steps: [
          "Open <strong>Connections → Twitch → Connect</strong>.",
          "Tap <strong>Open Twitch</strong> or copy the one-time activation code.",
          "Sign in on Twitch's official page and approve the displayed chat and moderation permissions.",
          "Return to IRL Dolphin. The connected login appears and live chat starts independently from other providers.",
          "Open <strong>Chat</strong> to read or send messages. Every moderation action has its own confirmation.",
        ],
        note: "If Twitch was connected before moderation permissions were added, disconnect and authorize it once again.",
      },
      {
        title: "Configure local OBS Studio",
        subtitle: "Scenes, sources, stream health and quick actions",
        steps: [
          "Use OBS Studio 28 or newer. Open <strong>Tools → WebSocket Server Settings</strong>.",
          "Enable the WebSocket server, keep authentication on and set a strong unique password. The default port is <code>4455</code>.",
          "Find the computer's private LAN address, for example <code>192.168.1.20</code>. Phone and computer must share the same trusted network.",
          "In IRL Dolphin open <strong>Connections → OBS Studio → Configure</strong>, enter address, port and password, then choose <strong>Save and connect</strong>.",
          "Mark common scenes as favorites. Visible favorites become one-tap dashboard actions; full-list scene changes still require confirmation.",
          "Use <strong>Sources</strong> for confirmed audio mute and current-scene visibility actions. <strong>Refresh diagnostics</strong> reads stream and performance metrics without changing OBS settings.",
        ],
        note: "Never forward port 4455 on the router. Guest Wi-Fi, client isolation and desktop firewalls can block the local connection.",
      },
      {
        title: "Connect StreamElements",
        subtitle: "Activities and donations through Astro",
        steps: [
          "Select the correct channel in the StreamElements dashboard and copy its token.",
          "Open <strong>Connections → StreamElements → Configure</strong>.",
          "Choose the token type; <strong>JWT</strong> is recommended. Enter a room only when support or your integration explicitly requires one.",
          "Enable <strong>Remember on this device</strong> only on your own device, then tap <strong>Connect securely</strong>.",
          "The profile is stored securely only after both live subscriptions are confirmed. Recent activities and donations remain only in bounded memory.",
        ],
        note: "Never put tokens in screenshots or bug reports. Real-account and long-session qualification is still required for beta.",
      },
      {
        title: "Enable chat speech",
        subtitle: "TTS stays off until you opt in",
        steps: [
          "Open <strong>Settings → Read chat aloud</strong> and explicitly enable TTS.",
          "Choose whether usernames are announced and which providers may be spoken.",
          "Only newly received live messages are spoken. Existing and historical messages stay silent.",
          "Test volume and audio routing before going live; disable TTS at any time in the same section.",
        ],
        note: "Your choice is restored, but old messages and queued speech are never stored or replayed.",
      },
      {
        title: "Android background session",
        subtitle: "Start deliberately, stop at any time",
        steps: [
          "Connect the providers you need first and enable TTS only when wanted.",
          "Open <strong>Settings → Background stream session</strong> and choose <strong>Start session</strong>.",
          "On Android 13 or newer, allow notifications so the running session remains visible. If denied, it is still stoppable in-app and under Android Active apps.",
          "Stop it through <strong>Stop session</strong> or the direct action in the ongoing notification.",
        ],
        note: "The session never auto-starts after app launch, reboot or force stop. Android 15+ limits dataSync background work to six hours in each 24-hour period.",
      },
      {
        title: "Settings and diagnostics",
        subtitle: "Transfer, inspect and troubleshoot privately",
        steps: [
          "Under <strong>Settings → Portable settings</strong>, <strong>Show export</strong> displays a small JSON document.",
          "Paste it into <strong>Import</strong> on another installation. Language, appearance and TTS choices are replaced together.",
          "For connection trouble, open <strong>Local diagnostics → View</strong> and record only the fixed failure code.",
          "Clear diagnostics when wanted. Every entry disappears when the app process ends anyway.",
        ],
        note: "Neither export nor diagnostics includes accounts, credentials, OBS profiles, favorites, messages or donation data.",
      },
      {
        title: "YouTube and Kick: current state",
        subtitle: "Not released as real account connections yet",
        steps: [
          "YouTube already has chat models and isolated states; native Google OAuth activation and the official streaming transport are still pending.",
          "Kick already has parsing, states and a secure WSS boundary. Operation requires a registered Kick app and a signature-verifying HTTPS/WSS relay.",
          "Both providers remain clearly labelled non-production or demo in the alpha. Never place client secrets in the app.",
        ],
        note: "Twitch, OBS and StreamElements continue independently even while YouTube or Kick is unavailable.",
      },
      {
        title: "Cameras, multiple devices and IRL hosts",
        subtitle: "Committed product direction, not part of the current alpha",
        steps: [
          "The planned media core captures phone, USB/UVC, IP and later vendor-specific camera sources and uses hardware encoding.",
          "One device can transmit alone; alternatively a controller coordinates several camera nodes that send directly to OBS or an external IRL host.",
          "RTMPS and SRT form the first target path. RTMP follows for deliberately selected local/legacy targets; SRTLA and RIST only after separate compatibility and stress qualification.",
          "While live, chat, TTS, alerts and connection health take priority. Confidence frames and continuous preview remain optional.",
        ],
        note: "These capabilities are not implemented yet. Do not enter stream keys into the current alpha or expose OBS WebSocket or any other local port to the internet.",
      },
    ],
    roadmap: [
      {
        state: "current",
        label: "Reached",
        title: "Alpha foundation · v0.1.0-alpha.3",
        text: "The technical core and first internally installable Android version are in place.",
        tasks: [
          "EN/DE, neutral light/dark appearance and lifecycle restoration",
          "Twitch, local OBS, StreamElements, TTS and privacy-safe local diagnostics",
          "Automated analysis, tests and Android debug build from green main",
          "User-started Android background session; honest foreground-only iOS boundary",
        ],
        gate: "Gate passed: reproducible, automatically validated internal build.",
      },
      {
        state: "current",
        label: "Next focus",
        title: "Physical alpha qualification",
        text: "Implemented functionality is stressed on real devices and with real accounts.",
        tasks: [
          "Huawei T15 Pro / Android 16: install, cold start, rotation and power management",
          "Twitch sign-in, renewal, live chat, moderation and network handover",
          "OBS on a real LAN: scenes, sources, start/stop and plausible performance values",
          "TTS with Bluetooth, phone calls, navigation and app resume",
          "Android background session including notification, force stop and time limit",
        ],
        gate: "Acceptance: no critical defects; every finding documented and regression-covered.",
      },
      {
        state: "next",
        label: "Then",
        title: "Single-device media core",
        text: "The first robust end-to-end path turns Dolphin from a controller into a real mobile IRL transmitter.",
        tasks: [
          "Native camera/audio sources and hardware encoding behind a stable media boundary",
          "RTMPS and SRT target profiles for local OBS or a user-selected IRL host",
          "Adaptive bitrate, reconnect and visible latency, packet-loss and temperature health",
          "Chat-first live surface with optional confidence frame and continuous preview",
          "Camera, microphone, network-handover, rotation and long-session device tests",
        ],
        gate: "Acceptance: one device transmits reliably to OBS and an IRL host without losing chat or control.",
      },
      {
        state: "later",
        label: "Building on it",
        title: "Multi-device and host beta",
        text: "Dolphin coordinates several sources at once without turning the controller into the media bottleneck.",
        tasks: [
          "Solo, controller and camera-node roles with secure mutual pairing",
          "Parallel direct transmission from every camera node to OBS or an IRL host",
          "Device cards with state, battery, temperature, bitrate and optional confidence frame",
          "Switching, standby source, connection loss and controlled fallback",
          "SRTLA for bonded networks and RIST as an additional qualified transport",
        ],
        gate: "Acceptance: at least two active sources can be monitored, switched and reconnected independently.",
      },
      {
        state: "later",
        label: "Beta scope",
        title: "Device and provider expansion",
        text: "Adapters extend the shared surface without branching the stable media or chat core.",
        tasks: [
          "USB/UVC, IP and selected vendor-specific camera adapters",
          "Native Google OAuth activation and official YouTube live transport",
          "Operate a secure Kick app/relay or explicitly exclude Kick from beta",
          "Final logo, minimum OS versions, support flow and legal privacy disclosures",
          "Android and iOS compatibility matrix for sources, transports and background limits",
        ],
        gate: "Acceptance: every advertised combination is physically verified or visibly marked unsupported.",
      },
      {
        state: "later",
        label: "Release candidate",
        title: "Store and upgrade qualification",
        text: "The release candidate focuses on safe delivery and reproducible updates.",
        tasks: [
          "Device matrix across Samsung, Pixel, Xiaomi and representative iPhones",
          "Protected store signing, internal tracks and TestFlight",
          "Clean install, previous-version upgrade and settings migration",
          "Bilingual store copy, screenshots, support site and rollback plan",
        ],
        gate: "Acceptance: release checklist complete, no blockers, rollback rehearsed.",
      },
      {
        state: "later",
        label: "Public",
        title: "v1.0 and ongoing maintenance",
        text: "The first public version rolls out gradually and is maintained continuously.",
        tasks: [
          "Staged rollout with measurable stop and rollback criteria",
          "Monthly provider compatibility review and quarterly Flutter upgrades",
          "Public known limitations, changelog and support path",
          "Pro features only after separate cost, privacy and purchase review",
        ],
        gate: "Acceptance: stable rollout and a sustainable maintenance process.",
      },
    ],
    suggestions: [
      ["Source compatibility matrix", "Verified phone, USB/UVC, IP and encoder sources with the controls each one actually exposes."],
      ["IRL host compatibility matrix", "Proven RTMP/RTMPS, SRT, SRTLA and RIST targets with date, operating mode and known limitations."],
      ["Release-driven notes", "A readable automatic view of approved GitHub releases without presenting an alpha as a public beta."],
      ["Privacy-checked tester feedback", "A prefilled bug report that reminds testers to remove tokens, chat and OBS passwords before submitting."],
      ["Real app screenshots", "Only after the beta UI stabilizes, then for each language and both appearance modes."],
    ],
    faq: [
      ["Can I download IRL Dolphin now?", "Only as an authorized tester from the private GitHub release. There is no public beta or store build yet."],
      ["Can IRL Dolphin transmit cameras today?", "Not yet. The current alpha contains the control and interaction foundation. Capture, encoding and RTMPS/SRT/SRTLA/RIST will be built as a separate media core and remain clearly marked planned until device-qualified."],
      ["Can I use several devices at the same time?", "That is now a committed goal. Multiple phones, cameras or encoders should transmit in parallel directly to OBS or an IRL host while Dolphin monitors and switches them centrally."],
      ["Must I watch my own camera feed all the time?", "No. The planned live surface is chat-first. A small confidence frame or continuous preview opens only when needed while transmission continues independently."],
      ["Do I need a paid service?", "Not for the current local core. LAN OBS, Twitch sign-in, updates and security are intended to stay free. A future Kick or remote relay does create operating costs and needs a separate decision."],
      ["Is an external IRL host the same as an exposed OBS connection?", "No. An explicitly configured media stream to a host is separate from OBS WebSocket control. Port 4455 stays closed; future remote control requires an authenticated Bridge."],
      ["Why is the background session unavailable on iOS?", "Chat WebSockets and occasional TTS do not justify an Apple background mode. IRL Dolphin therefore stays honestly foreground-only on iOS until a qualifying user-facing service exists."],
      ["Are chat messages or credentials collected?", "No. Local diagnostics cannot accept messages, names, tokens, URLs or raw failures and disappear when the app process ends."],
      ["Are YouTube and Kick complete?", "No. YouTube still needs native Google OAuth activation; Kick additionally needs a registered app and secure relay. Both are clearly labelled limited or demo."],
    ],
  },
};

let currentLanguage = "de";
let currentFilter = "all";
let verifiedDeviceState = "loading";
let verifiedDevices = [];

const setStoredValue = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (_) {
    // The website remains fully usable when browser storage is disabled.
  }
};

const getStoredValue = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
};

function applyTranslations(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language;
  document.title = dictionary.pageTitle;
  document.querySelector('meta[name="description"]').content = dictionary.pageDescription;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value) element.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = dictionary[element.dataset.i18nAria];
    if (value) element.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
}

function renderFeatures() {
  const languageContent = content[currentLanguage];
  const features = languageContent.features.filter(
    (feature) => currentFilter === "all" || feature.status === currentFilter,
  );
  const grid = document.querySelector("#feature-grid");

  if (!features.length) {
    grid.innerHTML = '<p class="empty-filter">No features match this filter.</p>';
    return;
  }

  grid.innerHTML = features
    .map(
      (feature) => `
        <article class="feature-card" data-status="${feature.status}">
          <div class="feature-top">
            <span class="feature-symbol" aria-hidden="true">${feature.symbol}</span>
            <span class="feature-status ${feature.status}">${languageContent.status[feature.status]}</span>
          </div>
          <h3>${feature.title}</h3>
          <p>${feature.text}</p>
          <span class="feature-detail">${feature.detail}</span>
        </article>`,
    )
    .join("");
}

function renderGuides() {
  const list = document.querySelector("#guide-list");
  list.innerHTML = content[currentLanguage].guides
    .map(
      (guide, index) => `
        <details class="guide-item"${index === 0 ? " open" : ""}>
          <summary>
            <span class="guide-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="guide-summary-text"><strong>${guide.title}</strong><small>${guide.subtitle}</small></span>
            <span class="chevron" aria-hidden="true">+</span>
          </summary>
          <div class="guide-content">
            <ol>${guide.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
            <p class="guide-note">${guide.note}</p>
          </div>
        </details>`,
    )
    .join("");
}

function renderRoadmap() {
  const list = document.querySelector("#roadmap-list");
  const gateLabel = currentLanguage === "de" ? "Qualitäts-Gate:" : "Quality gate:";
  list.innerHTML = content[currentLanguage].roadmap
    .map(
      (phase) => `
        <article class="roadmap-phase ${phase.state}">
          <div>
            <span class="phase-label">${phase.label}</span>
            <h3>${phase.title}</h3>
            <p>${phase.text}</p>
          </div>
          <div>
            <ul>${phase.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
            <p class="gate"><strong>${gateLabel}</strong> ${phase.gate.replace(/^Gate (erfüllt|passed): |^Abnahme: |^Acceptance: /, "")}</p>
          </div>
        </article>`,
    )
    .join("");
}

function renderSuggestions() {
  document.querySelector("#suggestion-list").innerHTML = content[currentLanguage].suggestions
    .map(([title, text]) => `<li><div><strong>${title}</strong><span>${text}</span></div></li>`)
    .join("");
}

function renderFaq() {
  document.querySelector("#faq-list").innerHTML = content[currentLanguage].faq
    .map(
      ([question, answer]) => `
        <details class="faq-item">
          <summary><strong>${question}</strong><span class="chevron" aria-hidden="true">+</span></summary>
          <div class="faq-content"><p>${answer}</p></div>
        </details>`,
    )
    .join("");
}

function renderVerifiedDevices() {
  const list = document.querySelector("#verified-device-list");
  if (!list) return;
  list.replaceChildren();
  const dictionary = translations[currentLanguage];

  if (verifiedDeviceState !== "ready" || verifiedDevices.length === 0) {
    const state = document.createElement("p");
    state.className = "device-list-state";
    state.textContent =
      verifiedDeviceState === "loading"
        ? dictionary.devicesLoading
        : verifiedDeviceState === "failed"
          ? dictionary.devicesLoadFailed
          : dictionary.devicesEmpty;
    list.append(state);
    return;
  }

  const numberFormat = new Intl.NumberFormat(currentLanguage);
  const dateFormat = new Intl.DateTimeFormat(currentLanguage, {
    dateStyle: "medium",
  });
  for (const device of verifiedDevices) {
    const profile = device.localMediaMeasurement?.highestConfirmedProfile;
    if (!profile) continue;
    const card = document.createElement("article");
    card.className = "verified-device-card";

    const header = document.createElement("div");
    header.className = "verified-device-header";
    const title = document.createElement("div");
    const model = document.createElement("h3");
    model.textContent = device.deviceModel;
    const system = document.createElement("p");
    system.textContent = `${platformName(device.platform)} · ${device.osVersion}`;
    title.append(model, system);
    const badge = document.createElement("span");
    badge.className = "verified-badge";
    badge.textContent = dictionary.deviceVerified;
    header.append(title, badge);

    const profileBlock = document.createElement("div");
    profileBlock.className = "verified-profile";
    const profileLabel = document.createElement("span");
    profileLabel.textContent = dictionary.deviceHighestProfile;
    const profileValue = document.createElement("strong");
    profileValue.textContent =
      `${profile.width}×${profile.height} · ${profile.framesPerSecond} FPS`;
    const profileMetrics = document.createElement("p");
    profileMetrics.textContent =
      `${dictionary.deviceRequestedBitrate}: ${numberFormat.format(profile.requestedBitrateKbps)} Kbit/s · ` +
      `${dictionary.deviceMeasuredProfile}: ${numberFormat.format(profile.effectiveFramesPerSecond)} FPS / ` +
      `${numberFormat.format(profile.effectiveBitrateKbps)} Kbit/s`;
    profileBlock.append(profileLabel, profileValue, profileMetrics);

    const details = document.createElement("dl");
    details.className = "verified-device-details";
    appendDetail(details, dictionary.deviceAppVersion, device.appVersion);
    appendDetail(
      details,
      dictionary.deviceEncoder,
      device.localMediaMeasurement.encoders.join(", "),
    );
    appendDetail(
      details,
      dictionary.deviceRuns,
      numberFormat.format(device.localMediaMeasurement.successfulRuns),
    );
    appendDetail(
      details,
      dictionary.deviceVerifiedOn,
      dateFormat.format(new Date(device.verifiedAtUtc)),
    );

    const evidence = document.createElement("a");
    evidence.className = "device-evidence-link";
    evidence.textContent = dictionary.deviceEvidence;
    if (
      /^https:\/\/github\.com\/Savox76\/irl-dolphin-web\/issues\/[1-9][0-9]*$/u.test(
        device.sourceIssue?.url ?? "",
      )
    ) {
      evidence.href = device.sourceIssue.url;
    } else {
      evidence.hidden = true;
    }

    card.append(header, profileBlock, details, evidence);
    list.append(card);
  }
}

function appendDetail(list, label, value) {
  const group = document.createElement("div");
  const term = document.createElement("dt");
  term.textContent = label;
  const description = document.createElement("dd");
  description.textContent = value;
  group.append(term, description);
  list.append(group);
}

function platformName(platform) {
  if (platform === "android") return "Android";
  if (platform === "ios") return "iOS";
  return platform;
}

async function loadVerifiedDevices() {
  try {
    const response = await fetch("verified-devices.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Device data request failed.");
    const data = await response.json();
    if (
      data?.schemaVersion !== 1 ||
      !Array.isArray(data.devices) ||
      data.devices.length > 1000
    ) {
      throw new Error("Device data schema is invalid.");
    }
    verifiedDevices = data.devices;
    verifiedDeviceState = "ready";
  } catch (_) {
    verifiedDevices = [];
    verifiedDeviceState = "failed";
  }
  renderVerifiedDevices();
}

function renderDynamicContent() {
  renderFeatures();
  renderGuides();
  renderRoadmap();
  renderSuggestions();
  renderFaq();
  renderVerifiedDevices();
}

function setLanguage(language) {
  if (!translations[language]) return;
  currentLanguage = language;
  applyTranslations(language);
  renderDynamicContent();
  setStoredValue("irl-dolphin-site-language", language);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  setStoredValue("irl-dolphin-site-theme", theme);
}

function initialize() {
  const storedLanguage = getStoredValue("irl-dolphin-site-language");
  const browserLanguage = navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
  const storedTheme = getStoredValue("irl-dolphin-site-theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  setTheme(storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme);
  setLanguage(storedLanguage === "de" || storedLanguage === "en" ? storedLanguage : browserLanguage);

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  document.querySelector("#theme-toggle").addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle("active", isActive);
        candidate.setAttribute("aria-pressed", String(isActive));
      });
      renderFeatures();
    });
  });

  void loadVerifiedDevices();
}

initialize();
