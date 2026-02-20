import { admin, firebaseEnabled } from '../config/firebase.js';

export const sendPush = async ({ tokens = [], title, body, data = {} }) => {
  if (!firebaseEnabled || !tokens.length) return;
  await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title, body },
    data
  });
};
