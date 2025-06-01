const { Router } = require('express');
const authRouter = Router();
const validate = require('../middlewares/validator');
const { authentication } = require('../middlewares/authorization');
const { register, login, userInfo, deleteAccount,forgotPassword,resetPassword, fetchAllUsers } = require('../controllers/auth.controller');
const { registerSchema, loginSchema } = require('../validations/authValidation');

authRouter.post('/sign-up', register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/forgot-password/:email', forgotPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.delete('/delete-account', authentication, deleteAccount);
authRouter.get('/user-info', authentication, userInfo);
authRouter.get('/all-users', authentication, fetchAllUsers);

module.exports = authRouter;