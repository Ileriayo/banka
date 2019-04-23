import express from 'express';

import userController from '../controllers/user.controller';
import signInValidation from '../middlewares/signInValidation';
import signUpValidation from '../middlewares/signUpValidation';

const userRouter = express.Router();

userRouter.post('/signin', signInValidation, userController.signIn);
userRouter.post('/signup', signUpValidation, userController.signUp);
userRouter.post('/staff', signUpValidation, userController.newStaff);

export default userRouter;
