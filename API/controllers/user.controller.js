import userData from '../utils/users';
import allTransactions from '../utils/transactions';

class userController {
  static signIn(req, res) {
    const { email } = req.body;
    const existingUser = userData.find(user => user.email === email)
    return res.json({
      status: 200,
      data: existingUser,
    }).status(200);
  }

  static signUp(req, res) {
    const {
      email,
    } = req.body;
    const newUser = userData.find(user => user.email === email);
    if (!newUser) {
      userData.push(req.body);
      return res.json({
        status: 200,
        data: userData[userData.length - 1],
      }).status(200);
    }
    return res.json({
      status: 400,
      error: 'email already exists',
    }).status(400);
  }

  static viewTransactions(req, res) {
    const transactions = allTransactions;
    return res.json({
      status: 200,
      data: transactions,
    }).status(200);
  }
}

export default userController;
