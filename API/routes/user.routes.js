import express from 'express';

import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/signin', userController.signIn);
userRouter.post('/signup', userController.signUp);

export default userRouter;
