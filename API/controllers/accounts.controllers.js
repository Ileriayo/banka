import allAccounts from '../utils/accounts';

class accountController {
  static viewAllAccounts(req, res) {
    const accounts = allAccounts;
    res.json({
      status: 200,
      data: accounts,
    }).status(200);
  }

  static deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const userAccount = allAccounts.find(account => account.accountNumber === Number(accountNumber));
    if (!userAccount) {
      res.status(404).json({
        status: 404,
        message: 'Account not found',
      });
      return;
    }
    const account = allAccounts.findIndex(acc => acc.accountNumber === Number(accountNumber));
    allAccounts.splice(account, 1);
    res.status(200).json({
      status: 200,
      message: 'Account successfully deleted',
    });
  }

  static viewAccount(req, res) {
    const { accountNumber } = req.params;
    const userAccount = allAccounts.find(account => account.accountNumber === Number(accountNumber));
    if (!userAccount) {
      res.status(404).json({
        status: 404,
        message: 'Account not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: userAccount,
    });
  }
}

export default accountController;
