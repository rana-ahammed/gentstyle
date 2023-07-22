import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const router = express.Router();
dotenv.config();

router.get('/login/success', (req, res) => {
    if (req.user) {
        return res.status(200).json({
            message: 'Successfully Logged In',
            user: req.user
        });
    } else {
        return res.status(403).json({
            message: 'Not Authorized'
        });
    }
});

// Google Route
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            sameSite: 'lax',
            httpOnly: true,
            secure: true
        };
        res.cookie('jwtToken', token, options);
        res.redirect(process.env.CLIENT_URL);
    }
);

// Facebook Route
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            sameSite: 'lax',
            httpOnly: true,
            secure: true
        };
        res.cookie('jwtToken', token, options);
        res.redirect(process.env.CLIENT_URL);
    }
);

// Github Route
router.get('/github', passport.authenticate('github', { scope: ['email', 'profile'] }));

router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            sameSite: 'lax',
            httpOnly: true,
            secure: true
        };
        res.cookie('jwtToken', token, options);
        res.redirect(process.env.CLIENT_URL);
    }
);

router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) return next(err);
    });
    req.session = null;
    res.cookie('jwtToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true
    });

    res.redirect(process.env.CLIENT_URL);
});

export default router;
