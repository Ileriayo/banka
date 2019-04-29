import express from 'express';

import aunthenticate from '../middlewares/authenticate';
import ValidateTransaction from '../middlewares/validateTransaction';
import validateTransactionInput from '../middlewares/validateTransactionInput';
// import transactionController from '../controllers/transactions.controller';
import transactionDBController from '../controllers/transactionsDB.controller';

const { validateTransaction } = ValidateTransaction;

const transactionRouter = express.Router();

// Postgres DB
// transactionRouter.get('/:accountNumber/transactions', aunthenticate.client, transactionDBController.viewAllTransactions);
transactionRouter.get('/:transactionId', aunthenticate.client, transactionDBController.viewOneTransaction);
transactionRouter.post('/:accountNumber/debit', validateTransactionInput, validateTransaction, transactionDBController.debitAccount);

// Dummy DB
// transactionRouter.get('/', aunthenticate.client, transactionController.viewTransactions);
// transactionRouter.post('/:accountNumber/credit', aunthenticate.client, aunthenticate.staff, transactionController.creditAccount);


export default transactionRouter;
