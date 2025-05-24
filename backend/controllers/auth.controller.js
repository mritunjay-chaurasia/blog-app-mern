const User = require("../models/auth.model");
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../middleware/authorization');

const saltRounds = 10;

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};



const register = async (req, res) => {
    const { name, email, phoneNumber, gender, password } = req.body
    try {
        if (!name || !email || !phoneNumber || !gender || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required (name, email, phoneNumber, gender, password).",
            })
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered.",
            });
        };

        const hashedPassword = hashPassword(password);
        const userData = {
            name,
            email,
            phoneNumber,
            gender,
            password: hashedPassword,
        };
        const user = await User.create(userData)
        const token = await generateAccessToken(user._id)

        return res.status(201).json({ success: true, message: "You registered successfuly", token })
    } catch (err) {
        const message = err?.message || "Internal server error during registration.";
        return res.status(500).json({ success: false, message: message, })
    }
}

module.exports = { register } 