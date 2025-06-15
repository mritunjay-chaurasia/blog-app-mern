
const { io } = require('./server');
const { Chat } = require('./models/chat.model');
const { Message } = require('./models/message.model');

io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on("joinMyRoom", (id) => {
        console.log("Received joinMyRoom for ID:", id);
        socket.join(id);
        console.log("Joined room:", [...socket.rooms]);
    });


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

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
})