# API Reference (Future v2)

## Trust + Verification + Premium + Moderation
- `POST /api/verification/request`
- `GET /api/verification/me`
- `PATCH /api/verification/:userId/approve` (admin)
- `PATCH /api/verification/:userId/reject` (admin)
- `GET /api/admin/reports` (admin)
- `PATCH /api/admin/users/:id/ban|warn|shadowban` (admin)
- `POST /api/premium/activate` (admin)
- `POST /api/premium/boost-profile`

## Communities
- `POST /api/communities`
- `GET /api/communities?college=&q=&page=&limit=`
- `POST /api/communities/:id/join`
- `PATCH /api/communities/:id/members/:userId/role`
- `POST /api/communities/:id/posts`
- `GET /api/communities/:id/posts?page=&limit=`

## Skill Bundles + Learning Paths
- `POST /api/bundles`
- `GET /api/bundles?search=&page=&limit=`
- `GET /api/bundles/:id`
- Swap supports `offeredSkill/requestedSkill` OR `offeredBundleId/requestedBundleId`.
- Swap supports `milestones[]` and idempotency key `clientRequestId`.

## Wallet
- `GET /api/wallet/me`
- `POST /api/wallet/grant` (admin)
- `POST /api/wallet/lock` (admin/internal)
- `POST /api/wallet/settle` (admin/internal)
- Session scheduling locks minutes from both participants; attendance completion/cancel settles lock.

## Disputes
- `POST /api/disputes`
- `GET /api/disputes/me`
- `GET /api/admin/disputes` (admin)
- `PATCH /api/admin/disputes/:id/resolve` body `{ verdict, adminNotes }`
- `STRIKE_REVERSED` decreases strike and clears cooldown when strikes < 3.

## Anti-spam + Safety
- `GET /api/safety/limits`
- Trust-score based daily swap limit: 5/10/20.

## Scheduling + Calendar
- `GET /api/scheduling/common-slots?userA=&userB=&weekStart=YYYY-MM-DD&timezone=`
- `GET /api/scheduling/sessions/:id/ics`

## GitHub OAuth (dev-friendly mock callback)
- `GET /api/oauth/github/start`
- `GET /api/oauth/github/callback`

## Referrals
- `GET /api/referrals/me`
- `POST /api/referrals/apply { code }`
- Successful referral completion reward: `+1 boostCredit` and `+60 wallet minutes`.

## Realtime Calls (Socket.IO signaling)
- `join-session-call`
- `call:offer`
- `call:answer`
- `call:ice`
- `call:end`
# API Reference (Upgraded)

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login` (denies banned users)
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

## Users / Discovery
- `GET /api/users/me`
- `PATCH /api/users/me` (supports portfolioLinks, leveled skills)
- `GET /api/users/search` -> returns `matchScore` + `reasons`
- `GET /api/users/recommended?page=&limit=`

## Verification
- `POST /api/verification/request` (collegeEmail or multipart `document`)
- `GET /api/verification/me`
- `PATCH /api/verification/:userId/approve` (admin)
- `PATCH /api/verification/:userId/reject` (admin)

## Moderation/Admin
- `GET /api/admin/reports?page=&limit=&status=&reason=`
- `PATCH /api/admin/users/:id/ban`
- `PATCH /api/admin/users/:id/warn`
- `PATCH /api/admin/users/:id/shadowban`

## Premium
- `POST /api/premium/activate` (admin)
- `POST /api/premium/boost-profile`

## Sessions + Accountability
- `POST /api/sessions` (blocked during cooldown)
- `GET /api/sessions/upcoming`
- `PATCH /api/sessions/:id/attendance` body `{ outcome: COMPLETED|NO_SHOW_OTHER|CANCELLED }`

No-show rules:
- `NO_SHOW_OTHER` increments the other participant's strike count once per session.
- at 3 strikes user receives 7-day cooldown.
- cooldown users cannot create swaps/sessions.

## Notifications
FCM events are emitted for:
- verification approved/rejected
- no-show reported
- cooldown applied
- boost activated
