const User = require("../models/auth.model");
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../middlewares/authorization');

const saltRounds = 10;

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};



const register = async (req, res) => {
    const { fullName, email, phone, gender, password, isUpdateEmail } = req.body
    try {
        if (!fullName || !email || !phone || !gender || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required (fullName, email, phone, gender, password).",
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
            fullName,
            email,
            phone,
            gender,
            password: hashedPassword,
            isUpdateEmail,
        };
        const user = await User.create(userData)
        const token = await generateAccessToken(user._id)

        return res.status(201).json({ success: true, message: "You registered successfuly", token })
    } catch (err) {
        const message = err?.message || "Internal server error during registration.";
        return res.status(500).json({ success: false, message: message, })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Basic field validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }
        const existingUser = await User.findOne({ email: email.trim() });
        if (!existingUser) {
            return res.status(401).json({ success: false, message: "Invalid email" })
        }
        // Compare passwords
        const isPasswordMatch = await bcrypt.compareSync(password, existingUser.password); // true
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Wrong Password" })
        }

        const token = await generateAccessToken(existingUser._id);
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ success: false, message: err?.message || "Internal server error during login" })
    }
}

module.exports = { register, login } 