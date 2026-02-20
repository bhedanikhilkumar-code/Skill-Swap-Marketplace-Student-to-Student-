# Architecture Updates (Future v2)

## Added Backend Domains
- Communities: `Community`, `CommunityMember`, `CommunityPost`.
- Learning paths: `SkillBundle`, swap milestones, idempotent swap requests.
- Time-credit wallet: user balance + lock, lock/settle hooks integrated with sessions.
- Disputes: dispute record with evidence, verdict, and audit log.
- Anti-spam: trust score snapshot + request limiter + safety limits endpoint.
- Scheduling: common slots computation + ICS export.
- OAuth: GitHub link flow (dev-friendly callback mock).
- Referrals: code, attribution, and reward settlement on first completion.
- RTC signaling: Socket.IO call events per `sessionId` room.

## Existing Layers Preserved
- JWT auth middleware, role checks, response shape, MongoDB models/controllers/routes pattern.
- Mobile app remains Riverpod + go_router architecture with incremental feature screens.

## Migration Strategy
- Script-based migrations in `backend/src/scripts`:
  - `migrate_add_fields.js`
  - `migrate_future_v2.js`
- Safe defaults are backfilled and legacy arrays are normalized.
# Architecture Updates

## Backend
- Added role-based access with `USER` / `ADMIN`.
- Added trust models: verification and premium metadata on `User`.
- Added moderation model nested under `User.moderation`.
- Added accountability model: strikes/cooldown and enhanced `Session` attendance state machine.
- Discovery endpoints now rank with match score, verification, boosts, and rating.

### New Modules
- `controllers/verificationController.js`
- `controllers/adminController.js`
- `controllers/premiumController.js`
- `routes/verificationRoutes.js`
- `routes/adminRoutes.js`
- `routes/premiumRoutes.js`
- `scripts/migrate_add_fields.js`

## Mobile
- Feed upgraded with Recommended + Nearby/College tabs.
- User cards show verified/premium badges and match reasons.
- Profile shows strikes/cooldown + portfolio + leveled skills.
- Added Verification and Premium screens.
- Added lightweight Admin screen gated by role.
- Sessions UI now supports attendance actions.
