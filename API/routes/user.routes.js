import express from 'express';

import userController from '../controllers/user.controller';
import userControllerDB from '../controllers/userDB.controller';

import signInValidation from '../middlewares/signInValidation';
import signUpValidation from '../middlewares/signUpValidation';

const userRouter = express.Router();

// POSTGRES DB
// userRouter.post('/signin', signInValidation, userController.signIn);
userRouter.post('/signup', signUpValidation, userControllerDB.signUp);
// userRouter.post('/staff', signUpValidation, userController.newStaff);

// DUMMY DATA
userRouter.post('/signin', signInValidation, userController.signIn);
// userRouter.post('/signup', signUpValidation, userController.signUp);
userRouter.post('/staff', signUpValidation, userController.newStaff);

export default userRouter;
