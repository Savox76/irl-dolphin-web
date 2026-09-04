# Privacy and data inventory / Datenschutz und Dateninventar

Document version 1.2 — 2026-09-04

Scope: IRL Dolphin private Android alpha `v0.1.0-alpha.3` plus current
unreleased changes.

This is the complete technical inventory for the features currently present in
IRL Dolphin. It is not yet the final public-store privacy policy: controller
identity, public contact, legal bases, regional rights text and store-specific
disclosures must be supplied and reviewed before public beta.

## English

### Current product boundary

IRL Dolphin has no enabled analytics, advertising, crash upload, cloud sync,
device identifier or IRL Dolphin-operated backend. Provider connections are
started by the user. OBS is restricted to the private local network. The local
diagnostic buffer has no export or upload path.

### Data inventory

| Data | Purpose | Location and retention | Recipient | User control |
|---|---|---|---|---|
| Language and appearance | Restore explicit UI choices | Protected app storage until changed, app data is cleared or the app is removed | None | Change in Settings; clear app data or uninstall |
| TTS enablement, username choice and provider filters | Restore explicit speech consent | Protected app storage; queued/current speech is never stored | None for the preference | Change in Settings |
| OAuth access/refresh tokens and one pending authorization session per provider | Authorize and restore a provider account; complete one bounded callback | Android encrypted storage or iOS Keychain until revoke, disconnect, expiry cleanup or app removal | Selected provider when authenticating or calling its API | Disconnect/revoke the provider; clear app data or uninstall |
| Twitch activation code and countdown | Complete Device Code authorization | Volatile memory for the active attempt only | Twitch | Cancel or let the code expire |
| OBS host, port and password | Reconnect to a user-selected OBS computer | Protected app storage; restored disconnected | Only the selected OBS instance on the private LAN | Forget OBS; clear app data or uninstall |
| OBS favorite and hidden-scene choices | Build local quick controls | Protected app storage, scoped to the saved OBS profile | None | Change favorites/visibility or forget OBS |
| Media target name, credential-free endpoint, target type, transport type, stream key or passphrase | Restore future user-selected RTMPS/SRT targets without placing secrets in URLs | Android encrypted storage or iOS Keychain; maximum 20 profiles until targeted deletion, app-data clearing or removal | No recipient while stored; only the explicitly selected target after a future confirmed start action | Delete one target or all targets; clear app data or uninstall |
| StreamElements token type, token, optional room and topics | Open the selected Astro live subscriptions | Protected app storage only after confirmed subscriptions; restored disconnected | StreamElements Astro | Disconnect or Forget StreamElements |
| Twitch/YouTube/Kick live chat, badges, emotes, reply and moderation context | Display the bounded unified live chat, send selected actions and feed opt-in TTS | Bounded volatile memory; removed by process termination | Provider only for explicit send/moderation actions | Disconnect; stop TTS; terminate the app process |
| StreamElements activity/tip content, display name, message, amount, currency and duplicate ID | Display a bounded newest-first live activity feed | Bounded volatile memory; cleared on disconnect or process termination | None after receipt | Disconnect StreamElements or terminate the app process |
| Current TTS text and queue | Speak only new live messages | Bounded volatile memory; never restored or transferred | Android/iOS speech service selected in device settings; processing may follow that service's own policy | Disable TTS, stop/clear speech, change device speech service |
| Fixed diagnostic code, category, severity, UTC time and approved numeric/boolean fields | Local troubleshooting without raw provider data | Maximum 200 events in volatile memory; process termination clears it | None | Settings → Local diagnostics → Clear |
| Live connection state, retry counters, deduplication IDs, OBS health/performance snapshots and background-session activation | Operate resilient live sessions | Volatile memory only | Selected provider/OBS only as required for the live connection | Disconnect/stop; process termination clears it |
| Portable settings document | User-directed transfer of language, appearance and TTS choices | Generated on demand; IRL Dolphin does not upload it | Only the destination chosen by the user outside the app | Close without copying; delete external copies |
| Explicit camera/encoder measurement frames and device qualification report: device model, OS/app version, hardware encoder, UTC test times, requested resolution/FPS/bitrate, measurements, fixed failure codes and build provenance | Measure the local camera-to-hardware-H.264 path and build a reviewed physical-device compatibility list | Frames go directly to the encoder and are discarded immediately. At most 24 runs remain in volatile memory until cleared or process termination. Only after a separate confirmation, the app opens a prefilled public GitHub issue; the issue then follows GitHub/repository retention | Nobody by default; after the user submits, the public `Savox76/irl-dolphin-web` issue repository and its readers | Stop or clear; inspect with **Copy report**; cancel before GitHub; do not submit; edit/delete the issue where permitted; revoke camera permission; delete external copies |

### Network destinations

- Twitch: documented HTTPS API, EventSub WebSocket and approved artwork CDN.
- StreamElements: fixed documented Astro secure WebSocket endpoint.
- OBS: the user-selected private-LAN WebSocket endpoint; public Internet
  addresses are rejected.
- YouTube: production connection remains disabled until owner-controlled Google
  OAuth registration and the official live transport are activated.
- Kick: production connection remains disabled until a registered app and
  signature-verifying HTTPS/WSS relay exist.
- Device TTS: the speech service selected by Android or iOS. IRL Dolphin does
  not operate that service and does not add an upload path.
- Device qualification: only after explicit confirmation, the system browser
  opens a prefilled HTTPS issue at `github.com/Savox76/irl-dolphin-web`.
  Nothing is submitted in the background; the tester performs GitHub's final
  public submission.

### Deliberately absent

No alpha feature sends data to analytics, advertising, crash-reporting or cloud-
sync services, and no qualification report is sent without an explicit public
submission action. No chat history, donation history, diagnostic history, TTS
backlog or foreground-session restart marker is persisted. Portable settings
exclude accounts, tokens, passwords, connection profiles, scene preferences,
diagnostics, messages and donation data.

### Before public beta

The public privacy policy still requires the controller's legal identity and
contact, applicable legal bases and user-rights wording, processor/provider
links, store data-safety/privacy labels, support/deletion contact and a final
review against the shipping build. No checklist should claim that legal work is
complete before those facts exist.

## Deutsch

### Aktuelle Produktgrenze

IRL Dolphin nutzt derzeit keine Analyse, Werbung, Absturzübertragung,
Cloud-Synchronisierung, Gerätekennung und kein von IRL Dolphin betriebenes
Backend. Anbieter-Verbindungen startet der Nutzer. OBS ist auf das private
lokale Netzwerk begrenzt. Die lokale Diagnose besitzt weder Export- noch
Uploadweg.

### Dateninventar

| Daten | Zweck | Speicherort und Dauer | Empfänger | Kontrolle |
|---|---|---|---|---|
| Sprache und Darstellung | Ausdrückliche UI-Auswahl wiederherstellen | Geschützter App-Speicher bis zur Änderung, zum Löschen der App-Daten oder zur Deinstallation | Niemand | In Einstellungen ändern; App-Daten löschen oder deinstallieren |
| TTS-Aktivierung, Nutzername und Anbieterfilter | Ausdrückliche Sprach-Auswahl wiederherstellen | Geschützter App-Speicher; laufende und wartende Sprachausgabe wird nie gespeichert | Niemand für die Einstellung | In Einstellungen ändern |
| OAuth-Zugriffs-/Erneuerungstokens und je Anbieter eine wartende Autorisierung | Anbieterkonto autorisieren/wiederherstellen und einen begrenzten Callback abschließen | Android-verschlüsselter Speicher oder iOS-Schlüsselbund bis Widerruf, Trennung, Ablaufbereinigung oder Deinstallation | Gewählter Anbieter bei Anmeldung/API-Aufruf | Anbieter trennen/widerrufen; App-Daten löschen oder deinstallieren |
| Twitch-Aktivierungscode und Countdown | Device-Code-Anmeldung abschließen | Nur im flüchtigen Speicher des laufenden Versuchs | Twitch | Abbrechen oder ablaufen lassen |
| OBS-Rechner, Port und Passwort | Gewählten OBS-Rechner erneut verbinden | Geschützter App-Speicher; wird getrennt wiederhergestellt | Nur die gewählte OBS-Instanz im privaten LAN | OBS vergessen; App-Daten löschen oder deinstallieren |
| OBS-Favoriten und ausgeblendete Szenen | Lokale Schnellbedienung aufbauen | Geschützter App-Speicher, dem gespeicherten OBS-Profil zugeordnet | Niemand | Favoriten/Sichtbarkeit ändern oder OBS vergessen |
| Medienzielname, zugangsdatenfreier Endpunkt, Ziel-/Transportart, Streamschlüssel oder Passphrase | Künftig bewusst gewählte RTMPS-/SRT-Ziele wiederherstellen, ohne Geheimnisse in URLs abzulegen | Android-verschlüsselter Speicher oder iOS-Schlüsselbund; maximal 20 Profile bis zur gezielten Löschung, zum Löschen der App-Daten oder zur Deinstallation | Während der Speicherung niemand; erst nach einer künftigen bestätigten Startaktion das ausdrücklich gewählte Ziel | Ein Ziel oder alle Ziele löschen; App-Daten löschen oder deinstallieren |
| StreamElements-Token-Typ, Token, optionaler Raum und Themen | Gewählte Astro-Live-Abonnements öffnen | Geschützter App-Speicher erst nach bestätigten Abonnements; wird getrennt wiederhergestellt | StreamElements Astro | Trennen oder StreamElements vergessen |
| Twitch-/YouTube-/Kick-Live-Chat, Badges, Emotes, Antworten und Moderationskontext | Begrenzten Live-Chat anzeigen, gewählte Aktionen senden und Opt-in-TTS versorgen | Begrenzter flüchtiger Speicher; endet mit dem App-Prozess | Anbieter nur bei ausdrücklichem Versand/Moderation | Trennen; TTS beenden; App-Prozess beenden |
| StreamElements-Aktivität/Spende, Anzeigename, Nachricht, Betrag, Währung und Duplikat-ID | Begrenzten Live-Feed nach Aktualität anzeigen | Begrenzter flüchtiger Speicher; beim Trennen oder Prozessende gelöscht | Nach Empfang niemand | StreamElements trennen oder App-Prozess beenden |
| Aktueller TTS-Text und Warteschlange | Nur neue Live-Nachrichten sprechen | Begrenzter flüchtiger Speicher; nie wiederhergestellt oder übertragen | In Android/iOS gewählter Sprachdienst; dessen eigene Regeln können gelten | TTS ausschalten, Sprache stoppen/leeren oder Gerätedienst ändern |
| Fester Diagnosecode, Kategorie, Schweregrad, UTC-Zeit und freigegebene Zahlen-/Wahrheitswerte | Lokale Fehlersuche ohne rohe Anbieterdaten | Maximal 200 Ereignisse im flüchtigen Speicher; Prozessende löscht sie | Niemand | Einstellungen → Lokale Diagnose → Leeren |
| Live-Verbindungszustand, Wiederholungszähler, Duplikat-IDs, OBS-Status-/Leistungswerte und Aktivierung der Hintergrundsitzung | Robuste Live-Sitzungen betreiben | Nur flüchtiger Speicher | Gewählter Anbieter/OBS nur soweit für die Verbindung nötig | Trennen/beenden; Prozessende löscht die Daten |
| Übertragbares Einstellungsdokument | Vom Nutzer gestartete Übertragung von Sprache, Darstellung und TTS-Auswahl | Wird auf Anforderung erzeugt; IRL Dolphin lädt es nicht hoch | Nur das vom Nutzer außerhalb der App gewählte Ziel | Ohne Kopieren schließen; externe Kopien löschen |
| Bilder der ausdrücklich gestarteten Kamera-/Encoder-Messung und Gerätequalifikationsbericht: Gerätemodell, Betriebssystem-/App-Version, Hardware-Encoder, UTC-Testzeiten, angeforderte Auflösung/FPS/Bitrate, Messwerte, feste Fehlercodes und Build-Herkunft | Lokalen Kamera-zu-Hardware-H.264-Pfad messen und eine geprüfte physische Geräte-Kompatibilitätsliste aufbauen | Bilder gehen direkt zum Encoder und werden sofort verworfen. Höchstens 24 Läufe bleiben bis zum Leeren oder Prozessende im flüchtigen Speicher. Erst nach separater Bestätigung öffnet die App ein vorausgefülltes öffentliches GitHub-Issue; danach gilt die GitHub-/Repository-Aufbewahrung | Standardmäßig niemand; nach dem Absenden das öffentliche Issue-Repository `Savox76/irl-dolphin-web` und dessen Leser | Stoppen oder leeren; mit **Bericht kopieren** prüfen; vor GitHub abbrechen; nicht absenden; Issue soweit erlaubt bearbeiten/löschen; Kameraberechtigung entziehen; externe Kopien löschen |

### Netzwerkziele

- Twitch: dokumentierte HTTPS-API, EventSub-WebSocket und freigegebenes
  Artwork-CDN.
- StreamElements: fester dokumentierter, sicherer Astro-WebSocket.
- OBS: der gewählte private LAN-WebSocket; öffentliche Internetadressen werden
  abgelehnt.
- YouTube: Produktionsverbindung bleibt aus, bis eigentümergeführte
  Google-OAuth-Registrierung und offizieller Live-Transport aktiviert sind.
- Kick: Produktionsverbindung bleibt aus, bis registrierte App und
  signaturprüfendes HTTPS/WSS-Relay existieren.
- Geräte-TTS: der in Android oder iOS gewählte Sprachdienst. IRL Dolphin
  betreibt ihn nicht und fügt keinen Uploadweg hinzu.
- Gerätequalifikation: Erst nach ausdrücklicher Bestätigung öffnet der
  Systembrowser ein vorausgefülltes HTTPS-Issue unter
  `github.com/Savox76/irl-dolphin-web`. Im Hintergrund wird nichts
  eingereicht; der Tester führt den abschließenden öffentlichen GitHub-Schritt
  selbst aus.

### Bewusst nicht vorhanden

Keine Alpha-Funktion sendet Daten an Analyse-, Werbe-, Absturzbericht- oder
Cloud-Sync-Dienste, und kein Qualifikationsbericht wird ohne ausdrückliche
öffentliche Absendeaktion übertragen. Chat-/Spenden-/Diagnosehistorie, TTS-Warteschlange und
Neustartmarker der Hintergrundsitzung werden nicht gespeichert. Übertragbare
Einstellungen schließen Konten, Tokens, Passwörter, Verbindungsprofile,
Szenenpräferenzen, Diagnosen, Nachrichten und Spendendaten aus.

### Vor der öffentlichen Beta

Für die öffentliche Datenschutzerklärung fehlen noch die rechtliche Identität
und Kontaktmöglichkeit des Verantwortlichen, Rechtsgrundlagen und Betroffenen-
rechte, Links zu Auftragsverarbeitern/Anbietern, Store-Datenschutzangaben,
Support-/Löschkontakt und die abschließende Prüfung gegen den auszuliefernden
Build. Vor diesen Fakten darf kein Häkchen die juristische Arbeit als
abgeschlossen darstellen.
