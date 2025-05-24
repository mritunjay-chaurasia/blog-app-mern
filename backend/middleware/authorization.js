const jwt = require('jsonwebtoken');

const generateAccessToken = async (id) => {
    const token = await jwt.sign({
        data: id
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRED_TOKEN });
    return token
};

const authentication = async (req, res, next) => {
    next();
};

module.exports = { generateAccessToken, authentication };