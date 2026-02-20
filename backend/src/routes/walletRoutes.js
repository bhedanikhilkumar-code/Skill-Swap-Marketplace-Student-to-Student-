import { Router } from 'express';
import { auth, requireAdmin } from '../middlewares/auth.js';
import { grantWallet, lockWalletApi, settleWalletApi, walletMe } from '../controllers/walletController.js';

const r = Router();
r.use(auth);
r.get('/me', walletMe);
r.post('/grant', requireAdmin, grantWallet);
r.post('/lock', requireAdmin, lockWalletApi);
r.post('/settle', requireAdmin, settleWalletApi);

export default r;
