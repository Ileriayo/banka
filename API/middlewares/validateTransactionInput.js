import { body } from 'express-validator/check';

export default [
  body('debitAmount', 'Debit amount is required').exists(),
  body('debitAmount', 'Debit amount must not be empty').trim().not().isEmpty(),
  body('debitAmount', 'Not a valid amount').isFloat(),

  body('transactionType', 'Transaction type must be specified').exists(),
  body('transactionType', 'Transaction type must not be empty').trim().not().isEmpty(),
  body('transactionType', 'Transaction type must be either debit or credit').isIn(['debit', 'credit']),
];
