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
