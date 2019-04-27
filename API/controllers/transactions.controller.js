// import allTransactions from '../utils/transactions';
// import allAccounts from '../utils/accounts';

// class transactionController {
//   static viewTransactions(req, res) {
//     return res.status(200).json({
//       status: 200,
//       data: allTransactions,
//     });
//   }

//   static debitAccount(req, res) {
//     const { accountNumber } = req.params;
//     const { debitAmount, transactionType } = req.body;
//     for (let i = 0; i < allAccounts.length; i += 1) {
//       if (allAccounts[i].accountNumber === Number(accountNumber)) {
//         const oldBalance = allAccounts[i].balance;
//         const newTransaction = {
//           transactionId: allTransactions.length + 1,
//           acountNumber: accountNumber,
//           amount: debitAmount,
//           oldBalance,
//           cashier: 2,
//           transactionType,
//           accountBalance: oldBalance - parseFloat(debitAmount),
//         };
//         allAccounts[i].balance = newTransaction.accountBalance;
//         allTransactions.push(newTransaction);
//         return res.status(200).json({
//           status: 200,
//           data: {
//             transactionId: newTransaction.transactionId,
//             accountNumber: newTransaction.accountNumber,
//             debitAmount,
//             transactionType,
//             accountBalance: newTransaction.accountBalance,
//           },
//         });
//       }
//     }
//     return res.status(404).json({ status: 404, error: 'Account not found' });
//   }

//   static creditAccount(req, res) {
//     const { accountNumber } = req.params;
//     const { debitAmount, transactionType } = req.body;
//     for (let i = 0; i < allAccounts.length; i += 1) {
//       if (allAccounts[i].accountNumber === Number(accountNumber)) {
//         const oldBalance = allAccounts[i].balance;
//         const newTransaction = {
//           transactionId: allTransactions.length + 1,
//           acountNumber: accountNumber,
//           amount: debitAmount,
//           oldBalance,
//           cashier: 2,
//           transactionType,
//           accountBalance: oldBalance + Number(debitAmount),
//         };
//         allAccounts[i].balance = newTransaction.accountBalance;
//         allTransactions.push(newTransaction);
//         return res.status(200).json({
//           status: 200,
//           data: {
//             transactionId: newTransaction.transactionId,
//             accountNumber: newTransaction.accountNumber,
//             debitAmount,
//             transactionType,
//             accountBalance: newTransaction.accountBalance,
//           },
//         });
//       }
//     }
//     return res.status(404).json({ status: 404, error: 'Account not found' });
//   }
// }

// export default transactionController;
