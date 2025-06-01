const User = require("../models/auth.model");
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../middlewares/authorization');
const crypto = require('crypto');

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
        let { email, password } = req.body;
        // Basic field validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email or password are required."
            });
        }
        email = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.warn(`Login attempt failed: User not found (${email})`);
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }
        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            console.warn(`Login attempt failed: Incorrect password (${email})`);
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        // Generate JWT
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

const forgotPassword = async (req, res) => {
    try {
        const email = req.params.email?.trim().toLowerCase();
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required."
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.warn(`Forgot password attempt failed: User not found (${email})`);
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        // Generate a secure token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + Number(process.env.RESET_TOKEN_EXPIRY); // 1 mint from now

        // Save token and expiry in user record
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        // await sendResetEmail(user.email, resetUrl);
        return res.status(200).json({
            success: true,
            message: "Password reset link sent succesuccessfully. Please check your email.",
            resetUrl
        });
    }
    catch (error) {
        console.error("Error during forgot password:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error during forgot password."
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        // Validate fields
        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: "token and password are required."
            });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
        }

        const hashedPassword = hashPassword(password);
        // Update user password
        user.password = hashedPassword;
        await user.save();

        console.info(`Password reset successful for user: ${user.email}`);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
    }
    catch (error) {
        console.error("Error during reset password:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error during password reset."
        });
    }
}

const userInfo = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user._id })
        if (!user) {
            return res.status(204).json({ success: false, message: "User not found" })
        }
        return res.status(200).json({ success: true, message: "User found", user })
    }
    catch (error) {
        console.error("Error during fetching user info", error);
        return res.status(500).json({ success: false, message: error })
    }
}

const deleteAccount = async (req, res) => {
    try {
        const deleteResult = await User.deleteOne({ _id: req.user._id });

        if (deleteResult.deletedCount === 0) {
            console.warn(`Delete account failed: User not found (${req.user._id})`);
            return res.status(404).json({ success: false, message: "User not found." });
        }
        console.info(`User account deleted: ${req.user._id}`);
        return res.status(200).json({ success: true, message: "User account deleted successfully." });
    }
    catch (error) {
        console.error("Error during fetching user info", error);
        return res.status(500).json({ success: false, message: error })
    }
}

const fetchAllUsers = async (req, res) => {
    try {
        // fetch all users exclud password field
        const users = await User.find().select('-password')
        if (!users.length) {
            return res.status(200).json({
                success: true,
                message: "No users found.",
                users: []
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully.",
            users
        });
    } catch (error) {
        console.error("Internal server error during fetching all users", error);
        return res.status(500).json({ success: false, message: err?.message || "Internal server error during fetching users" })
    }
}

module.exports = { register, login, userInfo, deleteAccount, forgotPassword, resetPassword, fetchAllUsers } 