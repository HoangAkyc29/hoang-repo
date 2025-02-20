import express from 'express';
import { paymentController } from './index';
const router = express.Router();

router.post('/pay/:id', paymentController.pay);
router.get('/confirm/success', paymentController.success);
router.get('/confirm/cancel', paymentController.cancel);

export default router;