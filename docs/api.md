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
