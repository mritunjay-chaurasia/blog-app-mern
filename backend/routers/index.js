const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');
const chatRouter = require('./chat.router');

router.use('/user', authRouter);
router.use('/chat', chatRouter);

module.exports = router;
