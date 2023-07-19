import User from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const { jwtToken } = req.cookies;

        if (!jwtToken) {
            return res.status(401).json({
                message: 'Please Login First'
            });
        }

        const decoded = JWT.verify(jwtToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
