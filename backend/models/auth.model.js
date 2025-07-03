const mongoose = require('mongoose');
const crypto = require('crypto');
const { boolean } = require('joi');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => `usr_${crypto.randomBytes(4).toString('hex')}`
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    userStatus: {
        type: String,
        default: 'active'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isUpdateEmail: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;