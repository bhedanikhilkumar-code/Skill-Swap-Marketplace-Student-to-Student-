# Architecture

## Monorepo
- `backend`: Express + MongoDB + Socket.IO + FCM + Cloudinary
- `mobile`: Flutter + Riverpod + Dio + go_router + secure storage

## Backend Layers
- routes -> controllers -> services/models -> utils
- Centralized JSON error format `{ success:false, message, errors? }`

## Mobile Layers
- `core`: networking, theme, router, storage
- `features/*`: `data/domain/presentation`

## Realtime
- Socket.IO rooms: `swap:<swapId>` joined only for accepted swaps.
