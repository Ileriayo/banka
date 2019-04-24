import express from 'express';

import transactionController from '../controllers/transactions.controller';
import transactionDBController from '../controllers/transactionsDB.controller';

const transactionRouter = express.Router();

// Postgres DB
transactionRouter.get('/', transactionDBController.viewTransactions);

// Dummy DB
// transactionRouter.get('/', transactionController.viewTransactions);
transactionRouter.post('/:accountNumber/debit', transactionController.debitAccount);
transactionRouter.post('/:accountNumber/credit', transactionController.creditAccount);


export default transactionRouter;
