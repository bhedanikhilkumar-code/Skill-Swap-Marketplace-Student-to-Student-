import { admin, firebaseEnabled } from '../config/firebase.js';

export const sendPush = async ({ tokens = [], title, body, data = {} }) => {
  if (!firebaseEnabled || !tokens.length) return;
  await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title, body },
    data
  });
};

export const sendVerificationStatusPush = async (user, status) =>
  sendPush({
    tokens: user?.deviceTokens || [],
    title: 'Verification update',
    body: status === 'APPROVED' ? 'Your college verification is approved.' : 'Your verification request was rejected.',
    data: { type: 'verification_status', status }
  });

export const sendNoShowReportedPush = async (user) =>
  sendPush({
    tokens: user?.deviceTokens || [],
    title: 'No-show reported',
    body: `A no-show was reported. Current strikes: ${user.noShowStrikes || 0}`,
    data: { type: 'no_show', strikes: String(user.noShowStrikes || 0) }
  });

export const sendCooldownAppliedPush = async (user) =>
  sendPush({
    tokens: user?.deviceTokens || [],
    title: 'Cooldown applied',
    body: 'You reached 3 no-show strikes. Cooldown active for 7 days.',
    data: { type: 'cooldown', until: user.cooldownUntil?.toISOString() || '' }
  });

export const sendBoostActivatedPush = async (user) =>
  sendPush({
    tokens: user?.deviceTokens || [],
    title: 'Profile boosted',
    body: 'Your profile boost is now active for 7 days.',
    data: { type: 'boost', boostedUntil: user.boostedUntil?.toISOString() || '' }
  });
