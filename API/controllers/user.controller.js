import userData from '../utils/users';
import allTransactions from '../utils/transactions';

class userController {
  static signIn(req, res) {
    const { email } = req.body;
    const existingUser = userData.find(user => user.email === email);
    return res.json({
      status: 200,
      message: 'Sign in successful',
      data: existingUser,
    }).status(200);
  }

  static signUp(req, res) {
    const {
      email, firstName, lastName, password,
    } = req.body;
    const existingUser = userData.filter(user => user.email === email);
    const newUser = {
      id: userData[userData.length],
      email,
      firstName,
      lastName,
      password,
      type: 'client',
      isAdmin: false,
    };
    if (existingUser.length <= 0) {
      userData.push(newUser);
      return res.json({
        status: 201,
        message: 'Sign up successful',
        data: userData[userData.length - 1],
      }).status(201);
    }
    return res.json({
      status: 400,
      error: 'email already exists',
    }).status(400);
  }

  static newStaff(req, res) {
    const {
      email, firstName, lastName, password, isAdmin,
    } = req.body;
    const staff = userData.filter(user => user.email === email);
    const newStaff = {
      id: userData[userData.length],
      email,
      firstName,
      lastName,
      password,
      type: 'staff',
      isAdmin: false,
    };
    if (staff.length <= 0 && isAdmin !== true) {
      userData.push(newStaff);
      return res.json({
        status: 201,
        message: 'New staff successfully created',
        data: userData[userData.length - 1],
      }).status(201);
    }
    if (staff.length <= 0) {
      newStaff.isAdmin = true;
      userData.push(newStaff);
      return res.json({
        status: 201,
        message: 'New staff successfully created',
        data: userData[userData.length - 1],
      }).status(201);
    }
    return res.json({
      status: 400,
      error: 'email already exists',
    }).status(400);
  }

  static viewTransactions(res) {
    const transactions = allTransactions;
    return res.json({
      status: 200,
      data: transactions,
    }).status(200);
  }
}

export default userController;
