import express from 'express';

import accountController from '../controllers/accounts.controllers';

const accountRouter = express.Router();

accountRouter.get('/', accountController.viewAllAccounts);
accountRouter.delete('/:accountNumber', accountController.deleteAccount);

export default accountRouter;
