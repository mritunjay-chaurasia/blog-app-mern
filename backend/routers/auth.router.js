const { Router } = require('express');
const authRouter = Router();

const { register } = require('../controllers/auth.controller')

authRouter.post('/sign-up', register)

module.exports = authRouter;