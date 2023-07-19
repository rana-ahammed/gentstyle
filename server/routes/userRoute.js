import express from 'express';
import {
    login,
    logout,
    signup,
    verifyEmail,
    forgotPassword,
    resetPassword
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.get('/:id/verify/:token', verifyEmail);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot/password', forgotPassword);
router.put('/:id/reset/password/:token', resetPassword);

export default router;
