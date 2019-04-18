import express from 'express';

import accountController from '../controllers/accounts.controllers';

const accountRouter = express.Router();

accountRouter.get('/', accountController.viewAllAccounts);
accountRouter.post('/', accountController.createBankAccount);
accountRouter.delete('/:accountNumber', accountController.deleteAccount);
accountRouter.get('/:accountNumber', accountController.viewAccount);

export default accountRouter;
