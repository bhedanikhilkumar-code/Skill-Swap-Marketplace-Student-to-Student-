# API Summary

Base URL: `http://localhost:5000/api`

- Auth: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`
- Users: `/users/me`, `/users/:id`, `/users/search`
- Uploads: `/uploads/avatar`
- Swaps: `/swaps`, `/swaps/inbox`, `/swaps/sent`, `/swaps/:id`, `/swaps/:id/status`
- Chats: `/chats/:swapId/messages`
- Sessions: `/sessions`, `/sessions/upcoming`, `/sessions/:id`
- Reviews: `/reviews`, `/reviews/user/:userId`
- Safety: `/reports`, `/blocks`
- Notifications: `/notifications/token`
