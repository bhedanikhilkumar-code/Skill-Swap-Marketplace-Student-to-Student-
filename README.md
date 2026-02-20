# Skill Swap Marketplace (Student-to-Student)

A production-ready monorepo for a student skill exchange app: skill-for-skill, hour-for-hour.

## SELLABLE FEATURES
- Two-sided marketplace optimized for campus communities.
- AI-ready match score style algorithm for better exchange relevance.
- End-to-end trust stack: identity profile depth, rating/review history, reporting, and blocking.
- Realtime chat + session scheduling + push notifications for engagement and retention.
- White-label-friendly architecture for incubators, colleges, and startup studios.

## Repo Structure
- `/backend` Node.js + Express + MongoDB + Socket.IO + Firebase Admin + Cloudinary
- `/mobile` Flutter app using Riverpod and go_router
- `/docs` API and architecture docs + Postman collection
- `/scripts` one-command run scripts for Windows and Mac/Linux

## Setup Instructions
1. **MongoDB Atlas**: create cluster, whitelist IP, copy URI into `backend/.env`.
2. **Firebase Admin + FCM**: create service account and fill backend Firebase env keys.
3. **Cloudinary**: create account and set cloud name/API credentials in backend env.
4. **Backend run**:
   - Mac/Linux: `./scripts/run_backend.sh`
   - Windows: `./scripts/run_backend.ps1`
5. **Flutter run**:
   - Copy `mobile/.env.example` -> `mobile/.env`.
   - Mac/Linux: `./scripts/run_mobile.sh`
   - Windows: `./scripts/run_mobile.ps1`

## Screenshots
- `docs/screenshots/login.png` (placeholder)
- `docs/screenshots/feed.png` (placeholder)
- `docs/screenshots/chat.png` (placeholder)

## Core API Endpoints
See `docs/api.md` and `docs/postman_collection.json`.

## NEXT STEPS
- [ ] Add CI/CD (GitHub Actions) for backend tests + Flutter analyze.
- [ ] Add full widget/integration tests for critical mobile flows.
- [ ] Add admin moderation dashboard for reports.
- [ ] Add advanced recommendation/ranking and anti-spam heuristics.
