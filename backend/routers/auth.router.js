const { Router } = require('express');
const authRouter = Router();
const validate = require('../middlewares/validator');
const { register, login } = require('../controllers/auth.controller');
const { registerSchema, loginSchema } = require('../validations/authValidation');

authRouter.post('/sign-up', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
// authRouter.post('/forgot-password', forgotPassword);
// authRouter.post('/reset-password', resetPassword)
// authRouter.delete('/user/:id',deleteAccount)
// authRouter.get('/user/:id', userDetails)

module.exports = authRouter;