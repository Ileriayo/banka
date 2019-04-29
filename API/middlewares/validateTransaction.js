import { validationResult } from 'express-validator/check';

import SelectWithClause from '../Helper/selectWithClause';

const { selectWithClause } = SelectWithClause;

class ValidateTransaction {
  static async validateTransaction(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 400, errors: errors.array() });
        return;
      }
      const { accountNumber } = req.params;
      const userAccount = await selectWithClause('accounts', 'accountnumber', accountNumber);
      if (userAccount.length <= 0) {
        res.status(404).json({ status: 404, message: 'Account not found' });
        return;
      }
      req.data = { userAccount };
      next();
    } catch (err) {
      res.status(400).json({ status: 400, error: err });
    }
  }
}

export default ValidateTransaction;
