const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  isGroupChat: {
    type: Boolean,
    default: false
  },
  participants: [
    {
      type: String,
      ref: 'User'
    }
  ],
  groupAdmin: { type: String, ref: 'User' },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  chatName: {
    type: String,
    required: function () { return this.isGroupChat; }
  },
}, { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
