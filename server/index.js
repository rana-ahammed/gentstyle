import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import connectDatabase from './database/db.js';

dotenv.config();
const app = express();
connectDatabase();
app.use(cookieParser());
const corsConfig = {
    credentials: true,
    origin: `${process.env.CLIENT_URL}`
};
app.use(cors(corsConfig));
app.use(
    cookieSession({
        name: 'session',
        keys: [process.env.SESSION_SECRET],
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            path: '/',
            sameSite: 'none'
        }
    })
);
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import paymentRoute from './routes/paymentRoute.js';

app.use('/', userRoute);
app.use('/', productRoute);
app.use('/', paymentRoute);

app.get('/', (req, res) => {
    res.send('Server is working');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running successfully on port http://localhost:${process.env.PORT}`);
});
