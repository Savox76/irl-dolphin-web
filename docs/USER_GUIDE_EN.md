# IRL Dolphin user guide (English)

Version 1.1 — for `v0.1.0-alpha.3` and the planned product expansion

Updated: September 3, 2026

> IRL Dolphin is a private Android alpha. The current build is debug-signed,
> not publicly distributed and not yet approved for continuous production use.

## 1. Feature status labels

- **Implemented:** technically present and covered by automated validation.
- **Limited:** technically present, but physical device, real-account or
  long-session qualification is pending, or the platform sets a boundary.
- **Planned:** not included in a usable build yet.

“Implemented” does not mean beta-approved. Physical acceptance is part of the
pre-release master plan.

## 2. Install the alpha safely

1. Open release `v0.1.0-alpha.3` in the private repository.
2. Download only the attached Android debug APK.
3. When needed, compare its SHA-256 value with the release notes.
4. Allow Android to install from that source only for this installation.
5. Launch IRL Dolphin and check the launch screen, language and appearance
   before connecting an account.

Do not install a forwarded or renamed APK. The current alpha is neither Play
Store-signed nor a public beta.

## 3. Navigation and basic settings

The primary navigation contains four areas:

| Area | Purpose |
|---|---|
| **Home** | OBS quick actions, connection status and important stream actions |
| **Chat** | Unified live messages, Twitch sending and moderation |
| **Connections** | Twitch, YouTube, Kick, OBS Studio and StreamElements |
| **Settings** | Language, appearance, TTS, background session, transfer, diagnostics and updates |

Under **Settings → Language**, select device language, English or German. Under
**Appearance**, choose device setting, light or dark. Both choices and the
selected primary page are restored after Android process recreation.

## 4. Connect and use Twitch

### Connection

1. Open **Connections → Twitch → Connect**.
2. Wait for the one-time activation code.
3. Select **Open Twitch** or copy the code.
4. Sign in only on Twitch's official HTTPS page.
5. Approve the displayed chat and moderation permissions.
6. Return to the app. After validation, IRL Dolphin shows the account login.

If Twitch was connected before moderation permissions were introduced,
disconnect and authorize it once again. Permissions are never added silently.

### Chat and sending

- New Twitch messages appear under **Chat**.
- Badge and emote artwork comes from official Twitch CDNs. Chat continues with
  text/fallbacks when artwork is unavailable.
- Outgoing messages are limited to 500 Unicode code points.
- The app does not insert an optimistic local copy; the message appears once
  after Twitch delivers it through EventSub.

### Moderation

For eligible recent messages, **Moderate message** can offer:

- delete the message;
- time out the user for ten minutes;
- permanently ban the user.

Every action has a separate visible confirmation. Self, broadcaster and
moderator messages are protected from these local controls. A permanent ban
must be reversed in Twitch's moderation tools when needed.

## 5. Connect and control OBS Studio

### Prepare OBS

1. Use OBS Studio 28 or newer.
2. Open **Tools → WebSocket Server Settings**.
3. Enable the WebSocket server.
4. Keep authentication enabled and choose a strong unique password.
5. Normally keep port `4455`.
6. Find the computer's private LAN address, for example `192.168.1.20`.

Phone and OBS computer must use the same trusted local network. Guest Wi-Fi,
client isolation and desktop firewalls can block the connection.

### Connect in IRL Dolphin

1. Open **Connections → OBS Studio → Configure**.
2. Enter the local computer address, port and WebSocket password.
3. Choose **Save and connect**.
4. For errors, first check address, password, firewall and the shared LAN.

IRL Dolphin accepts loopback, link-local and private LAN addresses only. Public
IP addresses and public DNS destinations are rejected.

### Scenes and dashboard

- Find scenes through **Search scenes**.
- **Add favorite** saves a scene as a favorite.
- **Hide from quick controls** keeps it in OBS but removes it from the compact
  mobile list.
- Only favorite and visible scenes become one-tap actions on Home.
- A scene change from the full list requires confirmation.

### Sources and stream

- **Refresh sources** reads audio inputs and items from the current program
  scene.
- Mute/unmute and visible/hidden changes require confirmation.
- A program-scene change invalidates old source identifiers; refresh again.
- **Start stream** and **Stop stream** always require confirmation.

### Stream health and performance

**Refresh diagnostics** reads uptime, average output bitrate, congestion,
skipped frames, CPU, memory, available recording storage, FPS and render time.
It does not start, stop or configure OBS.

The displayed bitrate is a stream-to-date average, not an instantaneous network
sample. Status colors are conservative guidance, not a viewer-playback
guarantee.

> **Important:** never forward port `4455` on the router. Future true remote
> control requires a separately reviewed Bridge/VPN design.

## 6. Connect StreamElements

1. Select the correct channel in the StreamElements dashboard.
2. Copy that channel's token.
3. Open **Connections → StreamElements → Configure**.
4. Choose the token type; **JWT (recommended)** is the normal choice.
5. Leave **Channel room (optional)** empty unless support or your integration
   requires a specific value.
6. Use **Remember on this device** only on your own device.
7. Choose **Connect securely**.

The profile is stored securely only after confirmed activity and tip
subscriptions. New activities and donations appear newest-first and remain only
in bounded memory. Disconnecting clears those live events.

**Forget** deletes only the StreamElements token and connection settings from
this device.

## 7. Chat text-to-speech (TTS)

1. Open **Settings → Read chat aloud**.
2. Explicitly enable TTS.
3. Choose whether usernames are announced.
4. Enable or disable Twitch, YouTube and Kick filters.

Only newly received live messages are spoken. Historical messages stay silent.
The choice is restored after restart, but messages and queued speech are never
stored or replayed.

Before a real stream, test volume, Bluetooth, phone calls and navigation audio.
When device speech fails, visible chat continues independently.

## 8. Android background session

1. Connect the providers you need first.
2. Enable TTS only when wanted.
3. Open **Settings → Background stream session**.
4. Select **Start session**.
5. On Android 13+, allow notifications so the running session stays visible.
6. Stop it in-app or through **Stop session** in the ongoing notification.

The session never starts automatically at launch, boot, callback or after force
stop. It does not connect providers by itself; it retains already-active work.
With notification permission denied, it is still stoppable in-app and from
Android's Active apps surface.

Android 15+ limits `dataSync` background work to a total of six hours per
24-hour period. IRL Dolphin stops when Android reports that timeout.

This capability is unavailable on iOS. Chat and TTS work there only while the
app is active.

## 9. Transfer settings

Under **Settings → Portable settings**:

1. **Show export** produces a versioned JSON document.
2. Copy all of its text.
3. On the target installation, open **Import**.
4. Paste the document and confirm.

Only language, appearance, TTS enablement, username announcement and provider
filters are included. Accounts, OAuth tokens, OBS/StreamElements profiles,
passwords, favorites, diagnostics, messages and donation data are excluded. An
invalid document changes nothing.

## 10. Local diagnostics

Open **Settings → Local diagnostics → View**. The view contains only fixed
category/event codes, timestamps and pre-approved numeric or boolean values. It
has no upload, sharing or export action.

- at most 200 in-memory events;
- no usernames, chats, tokens, passwords, URLs or raw responses;
- **Clear** removes the buffer;
- process termination automatically removes everything.

For a bug report, record model, Android version, exact action, expected and
actual behavior, reproducibility and the visible safe diagnostic code. Check
screenshots for chat or account data before sharing.

## 11. Privacy and data

Open **Settings → Privacy & data → View**. The overview separates protected
preferences/credentials, live content held only in memory, network destinations
and data that is deliberately not collected.

The private alpha has no analytics, advertising, crash upload, cloud sync or
device identifier. OBS remains on the private LAN. TTS uses the speech service
selected in Android or iOS, whose own privacy rules may apply.

The complete technical inventory with purpose, storage, retention, recipient
and deletion control is in
[PRIVACY_AND_DATA_INVENTORY.md](PRIVACY_AND_DATA_INVENTORY.md). The final public
privacy policy follows only when real controller/contact, legal-basis, rights
and store disclosures are available.

## 12. Device qualification and public evidence

Under **Settings → Camera and encoder measurement**, test the local
camera-to-hardware-H.264 path. This test does not transmit a stream and does not
check networking, OBS, an IRL host or a streaming service.

1. Select a device-reported combination of **720p/1080p**, **30/60 FPS** and an
   offered **bitrate**.
2. Run the five-second test. Repeat relevant profiles and, when useful, the same
   case for stability evidence; the report retains at most 24 runs in memory.
3. Use **Copy report** to inspect the complete redacted JSON. Every measurement
   has a stable test-case ID derived from resolution, FPS, bitrate and duration.
4. Use **Submit public report** only when the fields listed in the dialog may be
   public. The app opens a prefilled issue in the public website repository;
   only your final GitHub submission transfers the report.
5. Automated validation confirms only schema, bounds and checksum. A profile
   becomes a **verified device** only after a maintainer separately reviews
   build provenance and measurements.

Local results remain until **Clear report** or app-process termination. A
submitted issue remains public. Editing it revokes device approval until the
new checksum is reviewed. Untested devices do not appear in the list and
receive no implicit compatibility claim.

The complete evidence lifecycle is documented in
[DEVICE_QUALIFICATION_PIPELINE.md](DEVICE_QUALIFICATION_PIPELINE.md).

## 13. YouTube and Kick

YouTube already has isolated models and chat states, but still needs native
Google OAuth activation and the official streaming transport.

Kick already has parsing, states and a secure WSS boundary. Real operation
needs a registered Kick app and signature-verifying HTTPS/WSS relay because a
client secret must never be embedded in Android or iOS.

Until then both providers remain visibly limited or demo. Twitch, OBS and
StreamElements continue independently.

## 14. Planned camera, host and multi-device operation

This section describes the committed target experience, **not** a capability of
the current alpha build. The local qualification test handles camera frames
only long enough to measure hardware encoding. `v0.1.0-alpha.3` cannot yet use
a camera for preview, recording or transmission, or send a media stream through
RTMP/RTMPS, SRT, SRTLA or RIST. Do not enter stream keys for this purpose.

The planned live surface remains chat-first: chat, TTS, alerts, device and
connection health stay visible. A confidence frame or full self-preview opens
only when needed; transmission does not depend on preview being open.

| Operating mode | Planned use |
|---|---|
| **Solo** | One phone captures audio/video, transmits and shows chat plus stream health. |
| **Hub** | One Dolphin device controls multiple attached cameras and produces a program stream. |
| **Distributed** | Multiple camera/encoder devices transmit directly to OBS or an IRL host while Dolphin coordinates them. |

Implementation starts with one phone camera/microphone plus RTMPS and SRT.
USB/UVC, IP and vendor-specific cameras, along with RTMP, SRTLA and RIST, follow
individually after real compatibility and endurance testing. Not every device or
IRL host automatically supports every protocol.

A media target is not OBS remote control: OBS WebSocket on port `4455` remains
inside the private LAN. Only the explicitly configured media path may lead to
an external IRL host.

## 15. Quick troubleshooting

| Problem | Check |
|---|---|
| Twitch code expires | Start a new activation; check Twitch availability and device time |
| Twitch moderation permission missing | Disconnect and authorize the account again |
| OBS unreachable | Same LAN, private IP, port, firewall and OBS server |
| OBS password rejected | Re-enter it in OBS and the app; keep authentication enabled |
| No OBS quick actions | Mark the scene as favorite and keep it visible |
| TTS is silent | Opt-in, provider filter, media volume and device speech |
| Background session stops | Android timeout, power management and Active apps |
| StreamElements rejected | Correct channel, token type and current token |

Never include an activation code, access token, OBS password, client secret or
unredacted chat in a bug report.
