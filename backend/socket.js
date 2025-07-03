
const Chat = require('./models/chat.model');
const Message = require('./models/message.model');

const initializeSocket = (io) => {
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on("joinRoom", (id) => {
        console.log("Received joinRoom for ID:", id);
        socket.join(id);
        console.log("Joined room:", [...socket.rooms]);
    });



    socket.on("joinGroup", (chatId) => {
        console.log("Received joinGroup for ID:", chatId);
        socket.join(chatId);
        console.log("Joined Group:", [...socket.rooms]);
    });



    // 1-to-1 chat messages
    socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
        // 1. Find or create chat between sender and receiver
        let chat = await Chat.findOne({
            isGroupChat: false,
            participants: { $all: [senderId, receiverId], $size: 2 },
        });

        if (!chat) {
            chat = await Chat.create({
                isGroupChat: false,
                participants: [senderId, receiverId],
            });
        }

        // 2. Save message to DB
        const message = await Message.create({
            sender: senderId,
            content,
            chat: chat._id,
        });

        // 3. Optionally: update chat's lastMessage
        chat.lastMessage = message._id;
        await chat.save();

        // 4. Emit message to receiver's socket room
        io.to(receiverId).emit("receiveMessage", {
            senderId,
            content,
            chatId: chat._id,
            sentAt: message.createdAt,
        });
    });

    socket.on("sendGroupMessage", async ({ senderId, content, chatId }) => {
        const chat = await Chat.findById(chatId).populate("participants");
        if (!chat) return;

        const message = await Message.create({
            sender: senderId,
            content,
            chat: chatId
        });

        chat.lastMessage = message._id;
        await chat.save();
        // Emit to all members in group
        chat.participants.forEach(user => {

            if (user._id.toString() !== senderId) {
                io.to(user._id.toString()).emit("receiveGroupMessage", {
                    senderId,
                    content,
                    chatId,
                    sentAt: message.createdAt,
                    isGroup: chat.isGroupChat,
                    chatName: chat.chatName
                });
            }
        });
    });


    socket.on("start-typing", (data) => {
        io.to(data.receiverId).emit('start-typing', data)
    });

    socket.on("stop-typing", (data) => {
        io.to(data.receiverId).emit('stop-typing', data)
    });


    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
};

module.exports = { initializeSocket };