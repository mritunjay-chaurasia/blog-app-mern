const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    isGroupChat: {
      type: Boolean,
      default: false
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ], // only for 1-to-1 chat
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    }, // only for group chat
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
