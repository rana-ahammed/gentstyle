import User from '../models/userModel.js';
import axios from 'axios';
import bcrypt from 'bcrypt';
import Token from '../models/tokenModel.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, email, password, recaptchaValue } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        axios
            .post(
                `https://google.com/recaptcha/api/siteverify?secret=${`${process.env.RECAPTCHA_SECRET_KEY}`}&response=${recaptchaValue}`
            )
            .then(async (result) => {
                if (result.data.success) {
                    let newUser = new User({
                        name,
                        email,
                        password
                    });

                    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
                    let hashPassword = bcrypt.hashSync(newUser.password, salt);
                    newUser.password = hashPassword;
                    newUser = await newUser.save();

                    const token = await new Token({
                        userId: newUser._id,
                        token: crypto.randomBytes(32).toString('hex')
                    }).save();

                    const verifyUrl = `${process.env.CLIENT_URL}/${newUser._id}/verify/${token.token}`;
                    const message = `Verify your account by clicking the link below: \n\n ${verifyUrl}`;

                    await sendEmail(newUser.email, 'Verify Email', message);
                    return res
                        .status(201)
                        .json({ message: 'An Email sent to your account please verify' });
                } else {
                    return res
                        .status(400)
                        .json({ message: 'Please click on I am not a Robot section' });
                }
            });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: 'Invalid link' });

        const token = await Token.findOneAndRemove({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: 'Invalid link' });

        await User.updateOne({ _id: user._id }, { verified: true }, { runValidators: true });

        return res.status(200).send({ message: 'Email verified successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save();
                const url = `${process.env.CLIENT_URL}/${user._id}/verify/${token.token}`;
                const message = `Verify your account by clicking the link below: \n\n ${url}`;

                await sendEmail(user.email, 'Verify Email', message);
            }

            const url = `${process.env.CLIENT_URL}/${user._id}/verify/${token.token}`;
            const message = `Verify your account by clicking the link below: \n\n ${url}`;

            await sendEmail(user.email, 'Verify Email', message);
            return res
                .status(200)
                .json({ user, message: 'An Email sent to your account please verify' });
        }

        const jwtToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
        const options = {
            maxAge: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            sameSite: 'lax',
            domain: 'rana-shop.vercel.app',
            secure: true,
            path: '/'
        };

        res.status(200)
            .cookie('jwtToken', jwtToken, options)
            .json({
                message: 'Login successful',
                user: {
                    name: user.name,
                    email: user.email,
                    verified: user.verified
                },
                jwtToken
            });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const logout = async (req, res) => {
    try {
        res.status(200)
            .cookie('jwtToken', null, {
                expires: new Date(Date.now()),
                sameSite: 'none',
                secure: true
            })
            .json({ message: 'Logout Successful' });
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'User is not exist' });
        }

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save();

        const verifyUrl = `${process.env.CLIENT_URL}/${user._id}/resetpassword/${token.token}`;

        const message = `To reset password for your account by clicking the link below: \n\n ${verifyUrl}`;

        await sendEmail(user.email, 'Reset Password', message);

        return res
            .status(200)
            .json({ message: 'An email sent to your email to reset your password' });
    } catch (error) {
        res.status(500).json({ message: 'Already email has been sent' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({ message: 'Your confirm password is not matched' });
        }
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Link' });
        }
        const token = await Token.findOneAndRemove({
            userId: req.params.id,
            token: req.params.token
        });
        if (!token) {
            return res.status(400).json({ message: 'Invalid Link' });
        }

        const salt = bcrypt.genSaltSync(Number(process.env.SALT));
        const hashPassword = bcrypt.hashSync(req.body.newPassword, salt);
        user.password = hashPassword;
        await user.save();
        res.status(200).json({ message: 'Your password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
