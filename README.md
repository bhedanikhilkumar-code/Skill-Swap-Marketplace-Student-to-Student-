# Skill Swap Marketplace (Student-to-Student)

A production-ready monorepo for a student skill exchange app: skill-for-skill, hour-for-hour.

## Repo Structure
- `/backend` Node.js + Express + MongoDB + Socket.IO + Firebase Admin + Cloudinary
- `/mobile` Flutter app using Riverpod and go_router
- `/docs` API and architecture docs + Postman collection
- `/scripts` one-command run scripts for Windows and Mac/Linux

## New Upgrade Highlights
- College verification workflow with admin approval/rejection.
- Moderation + admin controls (reports, warn, ban, shadowban).
- No-show strike accountability with cooldown enforcement.
- Discovery upgrades (`search` returns reasons and `recommended` endpoint).
- Portfolio links + skill levels in profiles.
- Premium activation and profile boost credits.
- FCM notifications for verification, no-show, cooldown, and boosts.

## Setup Instructions
1. Configure backend `.env` for MongoDB, JWT, Cloudinary, and Firebase.
2. Run migration for existing DB data:
   - `cd backend && npm run migrate`
3. Seed demo data (2 admins + verified/premium demo users):
   - `cd backend && npm run seed`
4. Start backend:
   - Mac/Linux: `./scripts/run_backend.sh`
   - Windows: `./scripts/run_backend.ps1`
5. Start Flutter app:
   - Mac/Linux: `./scripts/run_mobile.sh`
   - Windows: `./scripts/run_mobile.ps1`

## Admin Demo Accounts
- `admin1@student.edu` / `password123`
- `admin2@student.edu` / `password123`

## Documentation
- API docs: `docs/api.md`
- Architecture notes: `docs/architecture.md`
- Postman collection: `docs/postman_collection.json`
