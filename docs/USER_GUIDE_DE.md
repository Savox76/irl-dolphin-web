# IRL Dolphin Nutzerhandbuch (Deutsch)

Version 1.1 — passend zu `v0.1.0-alpha.3` und dem geplanten Produktausbau

Stand: 3. September 2026

> IRL Dolphin befindet sich in einer privaten Android-Alpha. Der aktuelle Build
> ist debug-signiert, nicht öffentlich verteilt und noch nicht für den
> dauerhaften Produktiveinsatz freigegeben.

## 1. Funktionsstatus verstehen

- **Umgesetzt:** technisch vorhanden und automatisiert geprüft.
- **Eingeschränkt:** technisch vorhanden, aber reale Geräte-, Konto- oder
  Langzeittests fehlen oder die Plattform setzt Grenzen.
- **Geplant:** noch nicht im nutzbaren Build enthalten.

Die Bezeichnung „umgesetzt“ ersetzt keine Beta-Freigabe. Physische Abnahmen sind
Teil des Vorversions-Masterplans.

## 2. Alpha sicher installieren

1. Öffne im privaten Repository den Release `v0.1.0-alpha.3`.
2. Lade nur die dort angehängte Android-Debug-APK herunter.
3. Vergleiche bei Bedarf den SHA-256-Wert mit dem Wert in den Release Notes.
4. Erlaube Android die Installation aus dieser Quelle nur für den
   Installationsvorgang.
5. Starte IRL Dolphin und prüfe Startbildschirm, Sprache und Darstellung, bevor
   du ein Konto verbindest.

Installiere keine weitergereichte oder umbenannte APK. Die aktuelle Alpha ist
weder Play-Store-signiert noch eine öffentliche Beta.

## 3. Navigation und Grundeinstellungen

Die Hauptnavigation besitzt vier Bereiche:

| Bereich | Zweck |
|---|---|
| **Home** | OBS-Schnellzugriffe, Verbindungsstatus und wichtige Stream-Aktionen |
| **Chat** | Anbieterübergreifende Live-Nachrichten, Twitch-Versand und Moderation |
| **Verbindungen** | Twitch, YouTube, Kick, OBS Studio und StreamElements |
| **Einstellungen** | Sprache, Darstellung, TTS, Hintergrundsitzung, Transfer, Diagnose und Updates |

Unter **Einstellungen → Sprache** wählst du Gerätesprache, Deutsch oder
Englisch. Unter **Darstellung** stehen Geräteeinstellung, Hell und Dunkel zur
Verfügung. Beide Auswahlen sowie die aktuelle Hauptseite werden nach einer
Android-Prozesswiederherstellung erneut angewendet.

## 4. Twitch verbinden und benutzen

### Verbindung

1. Öffne **Verbindungen → Twitch → Verbinden**.
2. Warte auf den einmaligen Aktivierungscode.
3. Wähle **Twitch öffnen** oder kopiere den Code.
4. Melde dich ausschließlich auf Twitchs offizieller HTTPS-Seite an.
5. Bestätige die angezeigten Chat- und Moderationsrechte.
6. Kehre zur App zurück. Nach Prüfung zeigt IRL Dolphin den Kontonamen an.

Wenn das Konto bereits vor Einführung der Moderationsrechte verbunden wurde,
muss es einmal getrennt und neu autorisiert werden. Rechte werden nie still
hinzugefügt.

### Chat und Versand

- Neue Twitch-Nachrichten erscheinen unter **Chat**.
- Badge- und Emote-Grafiken werden von offiziellen Twitch-CDNs geladen. Fällt
  das Artwork aus, läuft der Chat mit Text/Fallback weiter.
- Ausgehende Nachrichten sind auf 500 Unicode-Zeichen begrenzt.
- Die App zeigt keine optimistische lokale Kopie; die Nachricht erscheint nach
  der bestätigten EventSub-Auslieferung genau einmal.

### Moderation

Bei zulässigen aktuellen Nachrichten kann das Menü **Nachricht moderieren**
folgende Aktionen anbieten:

- Nachricht löschen;
- Nutzer für zehn Minuten sperren;
- Nutzer dauerhaft bannen.

Jede Aktion verlangt eine eigene sichtbare Bestätigung. Eigene sowie
Broadcaster-/Moderator-Nachrichten werden nicht als Ziel angeboten. Ein
permanenter Bann muss bei Bedarf in Twitchs Moderationswerkzeugen aufgehoben
werden.

## 5. OBS Studio verbinden und steuern

### OBS vorbereiten

1. Nutze OBS Studio 28 oder neuer.
2. Öffne **Werkzeuge → WebSocket-Servereinstellungen**.
3. Aktiviere den WebSocket-Server.
4. Lasse die Authentifizierung eingeschaltet und vergib ein starkes, eigenes
   Passwort.
5. Behalte normalerweise Port `4455`.
6. Ermittle die private LAN-Adresse des Rechners, zum Beispiel
   `192.168.1.20`.

Telefon und OBS-Rechner müssen dasselbe vertrauenswürdige lokale Netz nutzen.
Gast-WLAN, Client-Isolation oder eine Desktop-Firewall können die Verbindung
blockieren.

### In IRL Dolphin verbinden

1. Öffne **Verbindungen → OBS Studio → Einrichten**.
2. Trage lokale Rechneradresse, Port und WebSocket-Passwort ein.
3. Wähle **Speichern und verbinden**.
4. Bei Problemen prüfe zuerst Adresse, Passwort, Firewall und gemeinsames LAN.

IRL Dolphin akzeptiert nur Loopback-, Link-local- oder private LAN-Adressen.
Öffentliche IP-Adressen und öffentliche DNS-Ziele werden abgelehnt.

### Szenen und Dashboard

- Suche Szenen über **Szenen durchsuchen**.
- **Als Favorit speichern** nimmt eine Szene in die Favoriten auf.
- **Aus Schnellzugriffen ausblenden** hält eine Szene in OBS, entfernt sie aber
  aus der schnellen mobilen Auswahl.
- Nur favorisierte und sichtbare Szenen erscheinen als One-Tap-Aktion auf Home.
- Ein Wechsel aus der vollständigen Liste verlangt eine Bestätigung.

### Quellen und Stream

- **Quellen aktualisieren** liest Audioeingänge und Elemente der aktuellen
  Programmszene.
- Mute/Unmute sowie Sichtbar/Ausgeblendet verlangen eine Bestätigung.
- Ein Szenenwechsel verwirft alte Quell-IDs; aktualisiere die Quellen erneut.
- **Stream starten** und **Stream beenden** verlangen immer eine Bestätigung.

### Streamzustand und Leistung

**Diagnose aktualisieren** liest unter anderem Laufzeit, mittlere Ausgabebitrate,
Überlastung, ausgelassene Frames, CPU, Arbeitsspeicher, freien
Aufnahmespeicher, FPS und Renderzeit. Diese Aktion startet, stoppt oder
konfiguriert OBS nicht.

Die angezeigte Bitrate ist ein Mittelwert seit Streamstart, kein momentaner
Netzwerkwert. Statusfarben sind konservative Hinweise und keine Garantie für
die Wiedergabe beim Zuschauer.

> **Wichtig:** Port `4455` niemals im Router freigeben. Für spätere echte
> Fernsteuerung ist eine separat geprüfte Bridge/VPN-Lösung nötig.

## 6. StreamElements verbinden

1. Wähle im StreamElements-Dashboard den richtigen Kanal.
2. Kopiere das zugehörige Token.
3. Öffne **Verbindungen → StreamElements → Einrichten**.
4. Wähle den Token-Typ; **JWT (empfohlen)** ist die übliche Auswahl.
5. Lasse **Kanalraum (optional)** leer, außer Support oder Integration verlangt
   einen bestimmten Wert.
6. Nutze **Auf diesem Gerät merken** nur auf deinem eigenen Gerät.
7. Wähle **Sicher verbinden**.

Das Profil wird erst nach bestätigten Activity- und Tip-Abonnements geschützt
gespeichert. Neue Aktivitäten und Spenden erscheinen neueste zuerst und nur
begrenzt im Arbeitsspeicher. Beim Trennen werden diese Live-Ereignisse entfernt.

Mit **Vergessen** löschst du gezielt nur das StreamElements-Token und dessen
Verbindungseinstellungen von diesem Gerät.

## 7. Chat-Sprachausgabe (TTS)

1. Öffne **Einstellungen → Chat vorlesen**.
2. Aktiviere TTS ausdrücklich.
3. Wähle, ob Nutzernamen angesagt werden.
4. Aktiviere oder deaktiviere Twitch-, YouTube- und Kick-Filter.

Nur neue Live-Nachrichten werden gesprochen. Historische Nachrichten bleiben
still. Die Auswahl wird nach einem Neustart wiederhergestellt, aber Nachrichten
und Warteschlange werden nie gespeichert oder nachträglich abgespielt.

Teste vor einem echten Stream Lautstärke, Bluetooth, Telefonanruf und
Navigationsaudio. Wenn die Geräte-Sprachausgabe ausfällt, läuft der sichtbare
Chat unabhängig weiter.

## 8. Android-Hintergrundsitzung

1. Verbinde zuerst die gewünschten Anbieter.
2. Aktiviere TTS nur bei Bedarf.
3. Öffne **Einstellungen → Stream-Sitzung im Hintergrund**.
4. Wähle **Sitzung starten**.
5. Erlaube unter Android 13+ die Benachrichtigung, damit die laufende Sitzung
   gut sichtbar bleibt.
6. Beende die Sitzung in der App oder über **Sitzung beenden** in der
   dauerhaften Benachrichtigung.

Die Sitzung startet nie automatisch bei App-Start, Boot, Callback oder nach
Force Stop. Sie verbindet auch keinen Anbieter selbstständig, sondern hält nur
bereits aktive Arbeit. Bei abgelehnter Benachrichtigung bleibt sie in der App
und unter Androids aktiven Apps stoppbar.

Android 15+ begrenzt `dataSync`-Hintergrundarbeit auf insgesamt sechs Stunden
innerhalb von 24 Stunden. IRL Dolphin stoppt, wenn Android das Zeitlimit meldet.

Auf iOS bleibt diese Funktion nicht verfügbar. Chat und TTS arbeiten dort nur,
solange die App aktiv ist.

## 9. Einstellungen übertragen

Unter **Einstellungen → Einstellungen übertragen**:

1. **Export anzeigen** erzeugt ein versioniertes JSON-Dokument.
2. Kopiere den Text vollständig.
3. Öffne auf der Zielinstallation **Importieren**.
4. Füge das Dokument ein und bestätige.

Enthalten sind nur Sprache, Darstellung, TTS-Aktivierung,
Nutzernamen-Ansage und Anbieterfilter. Ausgeschlossen sind Konten, OAuth-Tokens,
OBS-/StreamElements-Profile, Passwörter, Favoriten, Diagnose, Nachrichten und
Spendendaten. Ein ungültiges Dokument verändert gar nichts.

## 10. Lokale Diagnose

Öffne **Einstellungen → Lokale Diagnose → Anzeigen**. Die Ansicht enthält nur
feste Kategorie-/Ereigniscodes, Zeitstempel sowie zuvor erlaubte Zahlen- oder
Ja/Nein-Werte. Sie besitzt keine Upload-, Teilen- oder Exportfunktion.

- maximal 200 Ereignisse im Arbeitsspeicher;
- keine Nutzernamen, Chats, Tokens, Passwörter, URLs oder Rohantworten;
- **Leeren** entfernt den Puffer;
- Prozessende entfernt automatisch alles.

Für einen Fehlerbericht notierst du Modell, Android-Version, genaue Aktion,
erwartetes und tatsächliches Verhalten, Wiederholbarkeit und den sichtbaren
sicheren Diagnosecode. Prüfe Screenshots vor dem Teilen auf Chat- oder
Kontodaten.

## 11. Datenschutz & Daten

Öffne **Einstellungen → Datenschutz & Daten → Ansehen**. Die Übersicht trennt
geschützt gespeicherte Einstellungen/Zugangsdaten, nur im Arbeitsspeicher
gehaltene Live-Inhalte, Netzwerkziele und bewusst nicht erhobene Daten.

IRL Dolphin nutzt in der privaten Alpha keine Analyse, Werbung,
Absturzübertragung, Cloud-Synchronisierung oder Gerätekennung. OBS bleibt im
privaten LAN. TTS nutzt den in Android oder iOS gewählten Sprachdienst, für den
dessen eigene Datenschutzregeln gelten können.

Das vollständige technische Inventar mit Zweck, Speicherort, Dauer, Empfänger
und Löschmöglichkeit steht in
[PRIVACY_AND_DATA_INVENTORY.md](PRIVACY_AND_DATA_INVENTORY.md). Die endgültige
öffentliche Datenschutzerklärung folgt erst mit echten Verantwortlichen-,
Kontakt-, Rechtsgrundlagen- und Store-Angaben.

## 12. Gerätequalifikation und öffentlicher Nachweis

Unter **Einstellungen → Kamera- und Encoder-Messung** prüfst du den lokalen
Kamera-zu-Hardware-H.264-Pfad. Dieser Test sendet noch keinen Stream und prüft
weder Netzwerk noch OBS, IRL-Host oder Streamingdienst.

1. Wähle eine vom Gerät gemeldete Kombination aus **720p/1080p**,
   **30/60 FPS** und der angebotenen **Bitrate**.
2. Starte den fünfsekündigen Test. Wiederhole relevante Profile und bei Bedarf
   denselben Test zur Stabilitätsbeurteilung; der Bericht hält höchstens 24
   Läufe im Arbeitsspeicher.
3. Nutze **Bericht kopieren**, um das vollständige bereinigte JSON zu prüfen.
   Jede Messung besitzt eine feste Testfall-ID aus Auflösung, FPS, Bitrate und
   Dauer.
4. Nutze **Öffentlich einreichen** nur, wenn die im Dialog genannten Felder
   veröffentlicht werden dürfen. Die App öffnet ein vorausgefülltes Issue im
   öffentlichen Webseiten-Repository; erst dein abschließendes Absenden auf
   GitHub überträgt den Bericht.
5. Die automatische Prüfung bestätigt nur Schema, Grenzen und Prüfsumme.
   **Geprüftes Gerät** wird das Profil erst nach separater Kontrolle der
   Build-Herkunft und Messwerte durch einen Maintainer.

Nach dem Test bleiben die lokalen Ergebnisse bis **Bericht leeren** oder bis zum
Ende des App-Prozesses erhalten. Ein abgesendetes Issue bleibt öffentlich. Eine
nachträgliche Änderung entzieht die Gerätefreigabe, bis die neue Prüfsumme
erneut kontrolliert wurde. Ungetestete Geräte erscheinen nicht in der Liste und
erhalten keine stillschweigende Kompatibilitätszusage.

Die vollständige Nachweiskette steht in
[DEVICE_QUALIFICATION_PIPELINE.md](DEVICE_QUALIFICATION_PIPELINE.md).

## 13. YouTube und Kick

YouTube besitzt bereits isolierte Modelle und Chat-Zustände, benötigt aber noch
die native Google-OAuth-Aktivierung und den offiziellen Streaming-Transport.

Kick besitzt Parser, Zustände und eine sichere WSS-Grenze. Für echten Betrieb
sind eine registrierte Kick-App und ein signaturprüfendes HTTPS/WSS-Relay nötig,
weil ein Client-Secret niemals in Android/iOS eingebettet werden darf.

Beide Anbieter bleiben bis dahin sichtbar eingeschränkt oder Demo. Twitch, OBS
und StreamElements funktionieren unabhängig davon weiter.

## 14. Geplanter Kamera-, Host- und Mehrgerätebetrieb

Dieser Abschnitt beschreibt das verbindliche Zielbild, **nicht** eine Funktion
des aktuellen Alpha-Builds. Der lokale Qualifikationstest verarbeitet
Kamerabilder nur unmittelbar für die Hardware-Encoder-Messung. In
`v0.1.0-alpha.3` kann IRL Dolphin noch keine Kamera für Vorschau, Aufzeichnung
oder Übertragung nutzen und keinen Medienstream per RTMP/RTMPS, SRT, SRTLA oder
RIST senden. Trage deshalb aktuell keine Stream-Keys für diese Aufgabe ein.

Die geplante Live-Oberfläche bleibt Chat-first: Chat, TTS, Alerts, Geräte- und
Verbindungszustände bleiben sichtbar. Ein Kontrollbild oder die vollständige
eigene Vorschau wird nur bei Bedarf geöffnet; die Übertragung hängt nicht von
der geöffneten Vorschau ab.

| Betriebsart | Geplante Verwendung |
|---|---|
| **Solo** | Ein Telefon nimmt Bild/Ton auf, überträgt und zeigt Chat sowie Streamzustand. |
| **Zentrale** | Ein Dolphin-Gerät steuert mehrere verbundene Kameras und erzeugt einen Programmstream. |
| **Verteilt** | Mehrere Kamera-/Encoder-Geräte senden direkt zu OBS oder einem IRL-Host; Dolphin koordiniert sie. |

Die Implementierung beginnt mit Kamera/Mikrofon eines Telefons sowie RTMPS und
SRT. USB/UVC-, IP- und herstellerspezifische Kameras sowie RTMP, SRTLA und RIST
folgen einzeln nach echten Kompatibilitäts- und Belastungstests. Nicht jedes
Gerät oder jeder IRL-Host unterstützt automatisch jedes Protokoll.

Ein Medienziel ist keine OBS-Fernsteuerung: Auch später bleibt OBS WebSocket auf
Port `4455` im privaten LAN. Nur der ausdrücklich konfigurierte Medienpfad darf
zu einem externen IRL-Host führen.

## 15. Schnelle Fehlerprüfung

| Problem | Prüfung |
|---|---|
| Twitch-Code läuft ab | Neue Aktivierung starten; Twitch-Verfügbarkeit und Uhrzeit prüfen |
| Twitch fehlen Moderationsrechte | Konto trennen und neu autorisieren |
| OBS nicht erreichbar | Gleiches LAN, private IP, Port, Firewall und OBS-Server prüfen |
| OBS-Passwort abgelehnt | Passwort in OBS und App neu eingeben; Authentifizierung eingeschaltet lassen |
| Keine OBS-Schnellaktionen | Szene als Favorit markieren und nicht ausblenden |
| TTS bleibt still | Opt-in, Anbieterfilter, Medienlautstärke und Geräte-Sprachausgabe prüfen |
| Hintergrundsitzung stoppt | Android-Zeitlimit, Energiemanagement und aktive Apps prüfen |
| StreamElements lehnt ab | Richtigen Kanal, Token-Typ und aktuelles Token prüfen |

Gib niemals Aktivierungscode, Zugangstoken, OBS-Passwort, Client-Secret oder
unredigierten Chat in einen Fehlerbericht ein.
