import express from 'express';

import transactionController from '../controllers/transactions.controller';

const transactionRouter = express.Router();

transactionRouter.post('/:accountNumber/debit', transactionController.debitAccount);

export default transactionRouter;
