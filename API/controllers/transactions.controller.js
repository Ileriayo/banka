import allTransactions from '../utils/transactions';
import accounts from '../utils/accounts';

class transactionController {
  static debitAccount(req, res) {
    const { accountNumber } = req.params;
    const { debitAmount, transactionType } = req.body;
    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].accountNumber === accountNumber) {
        let oldBalance = accounts[i].balance;
        const newTransaction = {
          transactionId: allTransactions.length + 1,
          acountNumber: accountNumber,
          amount: debitAmount,
          oldBalance,
          cashier: 2,
          transactionType,
          accountBalance: oldBalance -= parseFloat(debitAmount),
        };
        console.log(typeof balance, typeof debitAmount);
        console.log(newTransaction.accountBalance);
        accounts[i].balance = newTransaction.accountBalance;
        allTransactions.push(newTransaction);
        return res.status(200).json({
          status: 200,
          data: {
            transactionId: newTransaction.transactionId,
            accountNumber: newTransaction.accountNumber,
            debitAmount,
            transactionType,
            accountBalance: newTransaction.accountBalance,
          },
        });
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'not found',
    });
  }
}

export default transactionController;
