import express from 'express';
import paymentRequest from '../controllers/paymentController.js';
import { isAuthenticatedUser } from '../utils/isAuthenticated.js';

const router = express.Router();

router.post('/create-checkout-session', isAuthenticatedUser, paymentRequest);

export default router;
