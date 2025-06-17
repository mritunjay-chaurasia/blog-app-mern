const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  sender: {
    type: String,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["sent", "received", "read"],
    default: "sent"
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
