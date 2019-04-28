import express from 'express';
import validateSignIn from '../middlewares/validateSignIn';
import validateSignUp from '../middlewares/validateSignUp';

// import userController from '../controllers/user.controller';
import userControllerDB from '../controllers/userDB.controller';

// import signInValidation from '../middlewares/signInValidation';
// import signUpValidation from '../middlewares/signUpValidation';

const userRouter = express.Router();

// POSTGRES DB
userRouter.post('/auth/signin', validateSignIn, userControllerDB.signIn);
userRouter.post('/auth/signup', validateSignUp, userControllerDB.signUp);
userRouter.post('/auth/staff', validateSignUp, userControllerDB.newStaff);

userRouter.get('/user/:email/accounts', validateSignUp, userControllerDB.viewUserAccounts);

// DUMMY DATA
// userRouter.post('/signin', signInValidation, userController.signIn);
// userRouter.post('/signup', signUpValidation, userController.signUp);
// userRouter.post('/staff', signUpValidation, userController.newStaff);

export default userRouter;
