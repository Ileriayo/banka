import express from 'express';

import aunthenticate from '../middlewares/authenticate';
// import transactionController from '../controllers/transactions.controller';
import transactionDBController from '../controllers/transactionsDB.controller';

const transactionRouter = express.Router();

// Postgres DB
transactionRouter.get('/', aunthenticate.client, transactionDBController.viewTransactions);

// Dummy DB
// transactionRouter.get('/', aunthenticate.client, transactionController.viewTransactions);
// transactionRouter.post('/:accountNumber/debit', aunthenticate.client, aunthenticate.staff, transactionController.debitAccount);
// transactionRouter.post('/:accountNumber/credit', aunthenticate.client, aunthenticate.staff, transactionController.creditAccount);


export default transactionRouter;
