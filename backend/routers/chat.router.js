const { Router } = require('express');
const chatRouter = Router();
const { authMiddleware } = require('../middlewares/authorization');
const { createGroup, fetchChat, fetchUserGroups,fetchGroupChatMessages } = require('../controllers/chat.controller');

chatRouter.post('/create-group', authMiddleware, createGroup);
chatRouter.get('/fetch-chat', authMiddleware, fetchChat)
chatRouter.get('/groups', authMiddleware, fetchUserGroups)
chatRouter.get('/group-messages', authMiddleware, fetchGroupChatMessages)


module.exports = chatRouter;
