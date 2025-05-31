const express = require('express');
const router =  express.Router();

const authRouter = require('./auth.router');

router.use('/user',authRouter)

module.exports = router;
