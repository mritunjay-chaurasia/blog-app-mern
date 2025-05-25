const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => `usr_${crypto.randomBytes(4).toString('hex')}`
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        requiredd: true
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
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;