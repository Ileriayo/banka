import express from 'express';

// import aunthenticate from '../middlewares/authenticate';
// import accountController from '../controllers/accounts.controllers';

const accountRouter = express.Router();

// accountRouter.get('/', aunthenticate.client, aunthenticate.staff, accountController.viewAllAccounts);
// accountRouter.post('/', aunthenticate.client, accountController.createBankAccount);
// accountRouter.delete('/:accountNumber', aunthenticate.client, aunthenticate.staff, accountController.deleteAccount);
// accountRouter.get('/:accountNumber', aunthenticate.client, accountController.viewAccount);
// accountRouter.patch('/:accountNumber', aunthenticate.client, aunthenticate.staff, accountController.changeStatus);

export default accountRouter;
