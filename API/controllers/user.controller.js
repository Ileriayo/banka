import userData from '../utils/users';

class userController {
  static signIn(req, res) {
    const { email } = req.body;
    const validUser = userData.filter(user => user.email === email);
    res.status(200).json({
      status: 200,
      message: 'Sign in successful',
      data: validUser,
    });
  }

  static signUp(req, res) {
    const {
      email, firstName, lastName, password,
    } = req.body;
    const existingUser = userData.filter(user => user.email === email);
    const newUser = {
      id: userData.length + 1, email, firstName, lastName, password, type: 'client', isAdmin: false,
    };
    if (existingUser.length <= 0) {
      userData.push(newUser);
      res.status(201).json({
        status: 201,
        message: 'Sign up successful',
        data: userData[userData.length - 1],
      });
      return;
    }
    res.status(400).json({
      status: 400,
      error: 'email already exists',
    });
  }

  static newStaff(req, res) {
    const {
      email, firstName, lastName, password, isAdmin,
    } = req.body;
    const existingStaff = userData.filter(user => user.email === email);
    const newStaff = {
      id: userData[userData.length], email, firstName, lastName, password, type: 'staff', isAdmin: false,
    };
    if (existingStaff.length > 0) {
      res.status(400).json({
        status: 400,
        error: 'email already exists',
      });
      return;
    }
    if (existingStaff.length <= 0 && isAdmin === true) {
      newStaff.isAdmin = true;
    }
    userData.push(newStaff);
    res.status(201).json({
      status: 201,
      message: 'New staff successfully created',
      data: userData[userData.length - 1],
    });
  }
}

export default userController;
