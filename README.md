# Skill Swap Marketplace (Student-to-Student) 🚀

> **A trust-first, skill-for-skill network where students exchange expertise, build verified reputation, and accelerate career outcomes—without paying cash.**

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FCM-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Build](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## Elevator Pitch

Skill Swap Marketplace is a student-focused exchange platform where users trade **skills for skills** instead of money. A designer can swap with a coder, a public speaker with a data analyst, or a video editor with a marketer—creating a practical, reciprocal learning economy.

The product combines marketplace discovery, realtime collaboration, scheduling accountability, and trust verification into one integrated system. It is designed to help students gain portfolio-ready outcomes, stronger peer networks, and career momentum.

By turning peer learning into a structured, verifiable ecosystem, the platform creates long-term value for learners, mentors, communities, and recruiting pipelines.

---

## Core Value Proposition

- **No money barrier** — Access high-value learning and mentorship through time/expertise exchange, not tuition.
- **Verified ecosystem** — Identity and profile verification layers raise signal quality and reduce friction.
- **Accountability engine** — Session locks, attendance controls, disputes, and moderation improve execution reliability.
- **Career impact** — Every completed swap can contribute to portfolio quality, social proof, and employability.
- **Community flywheel** — Better outcomes improve trust, trust improves participation, participation improves liquidity.

---

## Complete Feature Matrix

| Feature | Status | Description |
|---|---|---|
| Marketplace | ✅ Live | Discover peers by skill supply/demand, trust signals, and recommendation reasons. |
| Swap System | ✅ Live | Structured swap lifecycle with robust request creation and state transitions. |
| Realtime Chat | ✅ Live | Socket-powered messaging for active swap participants and session coordination. |
| Scheduling & Accountability | ✅ Live | Session planning, no-show controls, cooldowns, and commitment enforcement. |
| Wallet System | ✅ Live | Time-credit wallet with lock/settle flows for transparent exchange settlement. |
| Trust & Safety | ✅ Live | Reporting, warnings, moderation actions, bans/shadowbans, and dispute workflows. |
| Communities | ✅ Live | Learning circles/clubs with role-based participation and peer engagement. |
| Skill Bundles | ✅ Live | Multi-skill tracks with milestone-style progression and practical outcomes. |
| Leaderboard | 🟡 Planned | XP and consistency leaderboards to reward meaningful contribution. |
| Internships | 🟡 Planned | Opportunity layer connecting high-signal students with career pathways. |
| Mentorship Mode | 🟡 Planned | Structured mentor-mentee pathways with goal tracking and progress visibility. |
| Resume Builder | 🟡 Planned | Convert verified skill activity and outcomes into exportable resume artifacts. |
| Analytics | 🟡 Planned | Product and learner analytics for progress, engagement, and operational insight. |
| Referrals | ✅ Live | Referral attribution and reward loops for growth and community expansion. |
| Resource Library | 🟡 Planned | Curated templates, guides, and learning resources mapped to skills. |
| Location Discovery | 🟡 Planned | Geo-aware matching for campus and local collaboration opportunities. |
| GitHub Verification | ✅ Live | GitHub linkage for developer identity trust and technical profile credibility. |
| AI Summary | 🟡 Planned | AI-generated summaries for profiles, swaps, and learning trajectories. |

---

## Architecture Overview

This repository is a **monorepo** that unifies backend APIs, mobile client experience, and technical documentation while preserving clear module boundaries.

### Monorepo Layout

```text
Skill-Swap-Marketplace-Student-to-Student-/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── scripts/
│   │   └── utils/
│   └── tests/
├── mobile/
│   └── lib/
│       ├── core/
│       │   ├── constants/
│       │   ├── network/
│       │   ├── router/
│       │   ├── storage/
│       │   └── widgets/
│       └── features/
│           ├── auth/
│           ├── marketplace/
│           ├── swaps/
│           ├── sessions/
│           ├── chat/
│           ├── communities/
│           ├── wallet/
│           └── ...
├── docs/
│   ├── api.md
│   ├── architecture.md
│   └── postman_collection.json
└── scripts/
```

### Clean Architecture & Separation of Concerns

- **Backend:** Route → Controller → Service → Model flow to isolate HTTP handling from domain logic.
- **Mobile:** `core/` for shared infrastructure; `features/` for domain-driven UI and state modules.
- **Docs-first operations:** API and architecture references live in `docs/` for onboarding consistency.
- **Scalable evolution:** New capabilities can be added as independent modules without cross-layer coupling.

---

## Tech Stack

### Mobile

- **Flutter** for cross-platform product delivery
- **Riverpod** for predictable state orchestration
- **go_router** for modular navigation and guarded routes
- **dio** for typed HTTP integration
- **Firebase Cloud Messaging (FCM)** for push notifications
- **WebRTC** foundations for synchronous communication experiences

### Backend

- **Node.js + Express** for API and business workflows
- **MongoDB + Mongoose** for flexible domain persistence
- **JWT** access/refresh token authentication strategy
- **Socket.IO** for realtime chat/session signaling
- **Firebase Admin** for backend notification dispatch
- **Cloudinary** for media uploads and transformation pipeline
- **Security middlewares:** `helmet`, `cors`, `express-mongo-sanitize`, cookie handling
- **Rate limiting:** `express-rate-limit` for abuse prevention and reliability hardening

---

## Smart Ranking Logic

Search and discovery prioritize high-trust, high-fit profiles in this order:

1. **Verified**
2. **Face verified**
3. **Boosted**
4. **XP**
5. **Match score**
6. **Rating**

**Match score** combines:

- Offered vs requested skill overlap
- Session availability compatibility
- Historical reliability (attendance/completion behavior)
- Profile quality/completeness signals

This creates a ranking model that balances **trust**, **relevance**, and **execution probability**.

---

## Screenshots

| Login | Home | Profile |
|---|---|---|
| ![Login](docs/screenshots/login.png) | ![Home](docs/screenshots/home.png) | ![Profile](docs/screenshots/profile.png) |

| Chat | Sessions | Communities |
|---|---|---|
| ![Chat](docs/screenshots/chat.png) | ![Sessions](docs/screenshots/sessions.png) | ![Communities](docs/screenshots/communities.png) |

| Internships | Analytics | Resume |
|---|---|---|
| ![Internships](docs/screenshots/internships.png) | ![Analytics](docs/screenshots/analytics.png) | ![Resume](docs/screenshots/resume.png) |

---

## Setup Guide

### Prerequisites

- Node.js `>=18`
- npm `>=9`
- MongoDB (local or Atlas)
- Flutter SDK `>=3.4`
- Android Studio and/or Xcode
- Firebase project (for FCM)
- Cloudinary account credentials

### Backend Setup

```bash
cd backend
npm install
npm run migrate
npm run migrate:v2
npm run seed
npm run dev
```

Backend default endpoint: `http://localhost:5000`

### Mobile Setup

```bash
cd mobile
flutter pub get
flutter run
```

### Environment Variables

**Backend (`backend/.env`)**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/skill_swap
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
CORS_ORIGIN=*
API_BASE_URL=http://localhost:5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Mobile (`mobile/.env`)**

```env
API_BASE_URL=http://10.0.2.2:5000
SOCKET_BASE_URL=http://10.0.2.2:5000
```

### Migration + Seed Instructions

```bash
cd backend
npm run migrate
npm run migrate:v2
npm run seed
```

Use these scripts to align schema updates and preload demo data before local testing.

---

## API & Docs

- Postman collection: `docs/postman_collection.json`
- API documentation: `docs/api.md`
- Architecture documentation: `docs/architecture.md`

---

## Why This Is Sellable

- **Scalable architecture:** modular backend/mobile design supports growth in users and features.
- **Built-in monetization hooks:** premium boosts, wallet flows, and referral economics are expansion-ready.
- **Gamification engine:** XP, trust signals, and ranking mechanics improve retention and activity quality.
- **Internship layer:** natural transition from peer learning to talent discovery and placement outcomes.
- **Resume export potential:** structured activity data can produce verifiable career artifacts.
- **Trust systems moat:** verification, moderation, and accountability improve marketplace quality defensibility.

---

## Roadmap

- AI-powered skill path recommendations and personalized growth plans
- Mentor marketplace with paid/credit hybrid engagement options
- Campus ambassador program and institution onboarding toolkit
- Team-based project pods and hackathon collaboration mode
- Recruiter dashboard for high-signal candidate discovery
- Verifiable public learner profiles with achievement timelines

---

## Contribution

We welcome thoughtful, production-quality contributions.

1. Fork the repository.
2. Create a branch: `git checkout -b feat/your-feature`.
3. Keep changes scoped and aligned with architecture boundaries.
4. Add or update tests/documentation where relevant.
5. Open a pull request with context, validation steps, and screenshots for UI-impacting changes.

---

## License

This project is licensed under the **MIT License** (placeholder).

See `LICENSE` for full terms once finalized.

---

## Deployment Notes (Production Placeholder)

### Backend

- Containerize the API service (Docker) with environment-specific config injection.
- Run behind a reverse proxy/load balancer (Nginx/ALB) with TLS termination.
- Use managed MongoDB with backups, alerting, and index observability.
- Enable horizontal scaling for stateless API nodes and Socket.IO adapter strategy.

### Mobile

- Configure per-environment flavors (dev/staging/prod) for API and socket base URLs.
- Integrate release pipelines for Android and iOS with signing automation.
- Use crash/analytics instrumentation for release monitoring and quality gates.

---

## Security & Trust Posture

- JWT-based auth model with short-lived access and controlled refresh windows.
- Security middleware baseline (`helmet`, CORS, sanitize, rate limit) for API hardening.
- Moderation controls, reports, strike workflows, and account action auditability.
- Verification-first ranking to reduce low-signal interactions and improve swap quality.

---

## Product KPIs (Suggested)

Track these metrics to monitor product-market fit and network quality:

- **Swap Completion Rate**
- **Weekly Active Swappers (WAS)**
- **No-show Rate**
- **Verification Coverage (%)**
- **Time-to-First Successful Swap**
- **Referral-to-Activation Conversion**

---

## Support

For architecture, API, and setup details, start here:

- `docs/architecture.md`
- `docs/api.md`
- `docs/postman_collection.json`

For contribution-related questions, open an issue with a reproducible context and expected outcome.
