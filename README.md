# Skill Swap Marketplace (Student-to-Student)

Monorepo with `backend` (Node/Express/Mongo/Socket.IO/FCM/Cloudinary) and `mobile` (Flutter/Riverpod/go_router/dio).

## Repo Structure
- `/backend` Node.js + Express + MongoDB + Socket.IO + Firebase Admin + Cloudinary
- `/mobile` Flutter app using Riverpod and go_router
- `/docs` API and architecture docs + Postman collection
- `/scripts` one-command run scripts for Windows and Mac/Linux

## Future v2 Features Implemented
1. Communities (clubs/circles with membership roles and posts)
2. Skill bundles + learning path milestones on swaps
3. Time-credit wallet with lock/settle flow for sessions
4. Dispute resolution with audit logs and strike reversal support
5. Anti-spam trust score + daily quota limits
6. Smart scheduling overlaps + ICS export
7. GitHub OAuth link (dev-friendly callback mock)
8. Referral system with completion rewards
9. Minimal in-app call signaling via Socket.IO events
10. Offline-safe idempotent swap creation via `clientRequestId`

## New Upgrade Highlights
- College verification workflow with admin approval/rejection.
- Moderation + admin controls (reports, warn, ban, shadowban).
- No-show strike accountability with cooldown enforcement.
- Discovery upgrades (`search` returns reasons and `recommended` endpoint).
- Portfolio links + skill levels in profiles.
- Premium activation and profile boost credits.
- FCM notifications for verification, no-show, cooldown, and boosts.

## Setup
```bash
cd backend
npm install
npm run migrate
npm run migrate:v2
npm run seed
npm run dev