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
