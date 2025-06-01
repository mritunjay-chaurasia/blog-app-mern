const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');

const generateAccessToken = async (id) => {
    const token = await jwt.sign({
        _id: id
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRED_TOKEN });
    return token
};

const authentication = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            return res.status(401).json({ success: false, message: "Unauthorized: Missing or invalid Authorization header " })
        }
        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: Missing token" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({ _id: decoded._id });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
        }
        req.user = {
            _id: user._id,
            email: user.email,
            role: user.role
        };
        next();
    }
    catch (error) {
        if (error?.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }
        console.error('Authentication error:', error);
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
};

module.exports = { generateAccessToken, authentication };