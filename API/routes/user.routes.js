import express from 'express';

import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/signin', userController.signIn);

export default userRouter;
