import admin from 'firebase-admin';
import { env } from './env.js';

let firebaseEnabled = false;

if (env.firebaseProjectId && env.firebaseClientEmail && env.firebasePrivateKey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.firebaseProjectId,
      clientEmail: env.firebaseClientEmail,
      privateKey: env.firebasePrivateKey
    })
  });
  firebaseEnabled = true;
}

export { admin, firebaseEnabled };
