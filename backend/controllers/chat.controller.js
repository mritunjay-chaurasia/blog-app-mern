const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

const createGroup = async (req, res) => {
    try {
        const { chatName, users } = req.body;
        const creatorId = req.user._id;

        if (!chatName || !users || users.length < 1) {
            return res.status(400).json({ success: false, message: 'Group name and at least one user are required' });
        }

        // Add creator to the group
        const allParticipants = [...users, creatorId];

        const group = await Chat.create({
            chatName,
            isGroupChat: true,
            participants: allParticipants,
        });

        res.status(200).json({ success: true, group });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const fetchChatMessages = async (req, res) => {
    try {
        const receiverId = req.query.receiverId
        const senderId = req.user._id
        if (!receiverId || !senderId) {
            return res.status(400).json({
                success: false,
                message: "Sender ID and Receiver ID are required.",
            });
        }
        // 1. Find or create chat between sender and receiver
        let chat = await Chat.findOne({
            isGroupChat: false,
            participants: { $all: [senderId, receiverId], $size: 2 },
        });
        // 2. If chat not found, return empty array
        if (!chat) {
            return res.status(200).json({ success: true, messages: [] });
        }
        // 3 . Fetch all messages
        const messages = await Message.find({ chat: chat._id })
            // .populate("sender", "fullName email")
            .sort({ createdAt: 1 }); // oldest to newest
        return res.status(200).json({ success: true, messages, })
    } catch (err) {
        const message = err?.message || "Internal server error during registration.";
        return res.status(500).json({ success: false, message: message, })
    }
}

const fetchGroups = async (req, res) => {
    try {
        const userId = req.user._id;
        const groups = await Chat.find({
            isGroupChat: true,
            participants: userId,
        }).select("_id chatName");
        res.status(200).json({ success: true, groups });
    } catch (err) {
        console.error("Error during fetch user group", err)
        res.status(500).json({ success: false, message: err.message });
    }
};

const fetchChat = async (req, res) => {
    try {
        const receiverId = req.query.receiverId
        const senderId = req.user._id
        if (!receiverId || !senderId) {
            return res.status(400).json({
                success: false,
                message: "Receiver ID are required.",
            });
        }
        // Find or create chat between sender and receiver
        let chat = await Chat.findOne({
            isGroupChat: false,
            participants: { $all: [senderId, receiverId], $size: 2 },
        });

        if (!chat) {
            return res.status(204).json({ success: true, messages: "Chat not found" });
        }

        res.status(200).json({ success: true, chat });
    } catch (err) {
        console.error("Error during fetch user group", err)
        res.status(500).json({ success: false, message: err.message });
    }
};

const fetchGroupChatMessages = async (req, res) => {
    try {
        const { chatId } = req.query;
        const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });
        return res.status(200).json({ success: true, messages });
    } catch (err) {
        console.error("Error during fetchGroupChatMessages", err)
        return res.status(500).json({ success: false, message: err.message });
    }
};



module.exports = { createGroup, fetchChatMessages, fetchChat, fetchGroups, fetchGroupChatMessages }