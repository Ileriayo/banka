import ValidateTransaction from '../middlewares/validateTransaction';

import Query from '../db/db';
import SelectWithClause from '../Helper/selectWithClause';

const { validateTransaction } = ValidateTransaction;
const { selectWithClause } = SelectWithClause;
const { query } = Query;

class transactionController {
  static async viewOneTransaction(req, res) {
    const { transactionId } = req.params;
    // Check that the right user checks his transaction
    const getOneTransaction = 'SELECT * FROM transactions WHERE id = $1';
    try {
      const result = await query(getOneTransaction, [transactionId]);
      const data = result.rows[0];
      return res.status(200).json({ Status: 200, data });
    } catch (err) {
      return res.status(400).json({ Status: 400, Error: err });
    }
  }

  static async debitAccount(req, res) {
    const { debitAmount, transactionType } = req.body;
    if (transactionType !== 'debit') {
      res.status(400).json({ status: 400, error: 'Not a debit transaction' });
      return;
    }
    const { id, balance } = req.data.userAccount[0];
    if (balance < debitAmount) {
      res.status(400).json({ status: 400, error: 'Balance is not enough' });
      return;
    }
    const newBalance = balance - debitAmount;

    const updateBalance = `UPDATE accounts SET balance = $1
                           WHERE accountnumber = $2`;
    const newTransaction = `INSERT INTO transactions(type, accountnumber, createdon, cashier, amount, oldbalance, newbalance)
                            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const { accountNumber } = req.params;
    await query(updateBalance, [newBalance, accountNumber]);
    const transactionResult = await query(newTransaction,
      [transactionType, accountNumber, new Date(), id, debitAmount, balance, newBalance]);
    console.log(transactionResult.rows[0]);

    const transactionId = transactionResult.rows[0].id;

    res.status(200).json({
      status: 200,
      data: {
        transactionId,
        accountNumber,
        debitAmount,
        transactionType,
        accountBalance: newBalance,
      },
    });
  }

  static async creditAccount(req, res) {
    const { debitAmount, transactionType } = req.body;
    if (transactionType !== 'credit') {
      res.status(400).json({ status: 400, error: 'Not a credit transaction' });
      return;
    }
    const { id, balance } = req.data.userAccount[0];
    // if (balance < debitAmount) {
    //   res.status(400).json({ status: 400, error: 'Balance is not enough' });
    //   return;
    // }
    const newBalance = balance + debitAmount;

    const updateBalance = `UPDATE accounts SET balance = $1
                           WHERE accountnumber = $2`;
    const newTransaction = `INSERT INTO transactions(type, accountnumber, createdon, cashier, amount, oldbalance, newbalance)
                            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const { accountNumber } = req.params;
    await query(updateBalance, [newBalance, accountNumber]);
    const transactionResult = await query(newTransaction,
      [transactionType, accountNumber, new Date(), id, debitAmount, balance, newBalance]);

    const transactionId = transactionResult.rows[0].id;

    res.status(200).json({
      status: 200,
      data: {
        transactionId,
        accountNumber,
        debitAmount,
        transactionType,
        accountBalance: newBalance,
      },
    });
  }
}

export default transactionController;
