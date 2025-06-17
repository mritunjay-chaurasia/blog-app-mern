const { Router } = require('express');
const chatRouter = Router();
const { authMiddleware } = require('../middlewares/authorization');
const { createGroup, fetchChatMessages, fetchGroups,fetchChat,fetchGroupChatMessages } = require('../controllers/chat.controller');

chatRouter.post('/create-group', authMiddleware, createGroup);
chatRouter.get('/chat', authMiddleware, fetchChat)
chatRouter.get('/chat-messages', authMiddleware, fetchChatMessages)
chatRouter.get('/groups', authMiddleware, fetchGroups)
chatRouter.get('/group-messages', authMiddleware, fetchGroupChatMessages)


module.exports = chatRouter;
