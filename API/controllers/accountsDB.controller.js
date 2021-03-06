import { validationResult } from 'express-validator/check';
import Query from '../db/db';
import CheckEmail from '../Helper/checkEmail';
import SelectWithClause from '../Helper/selectWithClause';

const { query } = Query;
const { selectWithClause } = SelectWithClause;
const { checkEmail } = CheckEmail;

class AccountController {
  static async viewAllAccounts(req, res) {
    try {
      const getAllAccounts = 'SELECT * FROM accounts LIMIT 100';
      const result = await query(getAllAccounts, []);
      const data = result.rows;
      return res.status(200).json({ Status: 200, data });
    } catch (err) {
      return res.status(400).json({ Status: 400, error: err });
    }
  }

  static async viewAllTransactions(req, res) {
    const { id } = req.data[0];
    const { accountNumber } = req.params;
    const getAllTransactions = `SELECT transactions.id, transactions.createdon,
                                       transactions.type, transactions.accountnumber,
                                       transactions.amount, transactions.oldbalance,
                                       transactions.newbalance FROM transactions
                                INNER JOIN accounts
                                ON transactions.accountnumber = accounts.accountnumber
                                WHERE accounts.accountnumber = $1
                                AND accounts.owner = $2`;
    try {
      const { rows } = await query(getAllTransactions, [accountNumber, id]);
      return res.status(200).json({ Status: 200, data: rows });
    } catch (err) {
      return res.status(400).json({ Status: 400, Error: err });
    }
  }

  static async viewAccountDetails(req, res) {
    const { accountNumber } = req.params;
    const getAccountDetails = `SELECT createdon, accountnumber, users.email, users.id, accounts.type, status, balance FROM accounts
                               INNER JOIN users
                               ON accounts.owner = users.id
                               WHERE accountnumber = $1`;
    try {
      const { rows } = await query(getAccountDetails, [accountNumber]);
      return res.status(200).json({ Status: 200, data: rows });
    } catch (err) {
      return res.status(400).json({ Status: 400, Error: err });
    }
  }

  static async createBankAccount(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const queryString = `INSERT INTO accounts(accountnumber, owner, type)
                        VALUES($1, $2, $3) RETURNING *`;
    const accountNumber = Math.floor(Math.random() * 900000);
    const { type } = req.body;

    await query(
      queryString,
      [accountNumber, req.data[0].id, type],
    );

    const { firstName, lastName, email } = req.data[0];

    return res.status(201).json({
      status: 201,
      message: 'Account created successfully',
      data: {
        accountNumber, firstName, lastName, email, type, openingBalance: 0.00,
      },
    });
  }

  static async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const userAccount = await selectWithClause('accounts', 'accountnumber', accountNumber);
    if (userAccount.length <= 0) {
      return res.status(404).json({ status: 404, message: 'Account not found' });
    }
    const queryString = 'DELETE FROM accounts WHERE accountnumber = $1';
    await query(queryString, [accountNumber]);
    return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
  }

  static async changeStatus(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const { accountNumber } = req.params;
    const userAccount = await selectWithClause('accounts', 'accountnumber', accountNumber);
    if (userAccount.length <= 0) {
      return res.status(404).json({ status: 404, message: 'Account not found' });
    }
    const { status } = req.body;
    const queryString = 'UPDATE accounts SET status = $1 where accountnumber = $2';
    await query(queryString, [status, accountNumber]);
    return res.status(200).json({
      status: 200,
      message: 'Account status updated',
      data: { AccountNumber: accountNumber, status },
    });
  }
}

export default AccountController;
