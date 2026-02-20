# Skill Swap Marketplace (Student-to-Student)

Monorepo with `backend` (Node/Express/Mongo/Socket.IO/FCM/Cloudinary) and `mobile` (Flutter/Riverpod/go_router/dio).

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

## Setup
```bash
cd backend
npm install
npm run migrate
npm run migrate:v2
npm run seed
npm run dev
```

## Docs
- `docs/api.md`
- `docs/architecture.md`
- `docs/postman_collection.json`

## Demo credentials
- `admin1@student.edu` / `password123`
- `admin2@student.edu` / `password123`
