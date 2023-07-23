import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import connectDatabase from './database/db.js';
import passport from './middlewares/passportMiddleware.js';

connectDatabase();

dotenv.config();
const app = express();
app.use(cookieParser());
const corsConfig = {
    credentials: true,
    origin: true
};
app.use(cors(corsConfig));
app.use(
    cookieSession({
        name: 'session',
        keys: [process.env.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: `${process.env.CLIENT_DOMAIN}`
    })
);
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import passportRoute from './routes/passportRoute.js';
import paymentRoute from './routes/paymentRoute.js';

app.use('/', userRoute);
app.use('/', productRoute);
app.use('/auth', passportRoute);
app.use('/', paymentRoute);

app.get('/', (req, res) => {
    res.send('Server is working');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running successfully on port http://localhost:${process.env.PORT}`);
});
