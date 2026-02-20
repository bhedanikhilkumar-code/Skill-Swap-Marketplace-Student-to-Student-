# Mobile App (Flutter)

## Added Screens/Flows (Future v2)
- Communities tab/feed/join/post
- Bundles browse/detail and swap creation support
- Wallet screen (balance/locked/available)
- Dispute flow entry from sessions
- Referral screen
- Common-slot suggestion and ICS export action hooks
- GitHub link button in profile
- Minimal call signaling screen/events integration placeholder with stable flow
- Offline light caching + queued swap drafts (idempotent `clientRequestId`)

## flutter_webrtc setup notes
- Add package in `pubspec.yaml`.
- Android: camera/mic permissions in `AndroidManifest.xml`.
- iOS: NSCameraUsageDescription + NSMicrophoneUsageDescription in `Info.plist`.
- Use Socket.IO events: `call:offer`, `call:answer`, `call:ice`, `call:end` with `sessionId`.
