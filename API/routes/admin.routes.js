import express from 'express';

import adminController from '../controllers/admin.controllers';

const adminRouter = express.Router();

adminRouter.get('/accounts', adminController.viewAllAccounts);

export default adminRouter;