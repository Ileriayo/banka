import express from 'express';

import CheckReqQuery from '../middlewares/checkReqQuery';
import aunthenticate from '../middlewares/authenticate';
import accountController from '../controllers/accountsDB.controller';
// import accountController from '../controllers/accounts.controllers';

import validateNewAccount from '../middlewares/validateNewAccount';
import validateUpdate from '../middlewares/validateUpdate';

const accountRouter = express.Router();

accountRouter.get('/:accountNumber/transactions', aunthenticate.client, accountController.viewAllTransactions);
accountRouter.get('/:accountNumber', aunthenticate.client, accountController.viewAccountDetails);
accountRouter.get('/', aunthenticate.client, aunthenticate.staff, CheckReqQuery.checkReqQuery, accountController.viewAllAccounts);
accountRouter.post('/', validateNewAccount, aunthenticate.client, accountController.createBankAccount);
accountRouter.delete('/:accountNumber', aunthenticate.client, aunthenticate.staff, accountController.deleteAccount);

// accountRouter.post('/', aunthenticate.client, accountController.createBankAccount);
// accountRouter.get('/:accountNumber', aunthenticate.client, accountController.viewAccount);
accountRouter.patch('/:accountNumber', validateUpdate, accountController.changeStatus);

export default accountRouter;
