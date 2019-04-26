import bcrypt from 'bcryptjs';
import userData from '../utils/users';
import tokenizer from '../Helper/tokenizer';

class userController {
  static signIn(req, res) {
    const { email } = req.body;
    const validUser = userData.filter(user => user.email === email);
    const { id, firstName, lastName } = validUser[0];
    const token = tokenizer({
      id, email, firstName, lastName,
    }, '365d');
    res.status(200).json({
      status: 200,
      message: 'Sign in successful',
      data: {
        token, id, email, firstName, lastName,
      },
    });
  }

  static signUp(req, res) {
    const {
      email, firstName, lastName, password,
    } = req.body;
    const existingUser = userData.filter(user => user.email === email);
    if (existingUser.length > 0) {
      res.status(409).json({
        status: 409,
        error: 'Conflict: Email already exists',
      });
      return;
    }
    bcrypt.hash(password, 10, ((err, hash) => {
      const newUser = {
        id: userData.length + 1, email, firstName, lastName, password: hash, type: 'client', isAdmin: false,
      };
      const token = tokenizer({
        id: newUser.id,
        email,
        firstName,
        lastName,
        type: newUser.type,
        isAdmin: newUser.isAdmin,
      });
      userData.push(newUser);
      return res.status(201).json({
        status: 201,
        message: 'Sign up successful',
        data: {
          token, id: newUser.id, email, firstName, lastName, type: newUser.type,
        },
      });
    }));
  }

  static newStaff(req, res) {
    const {
      email, firstName, lastName, password,
    } = req.body;
    const existingStaff = userData.filter(user => user.email === email);
    if (existingStaff.length > 0) {
      res.status(409).json({
        status: 409,
        error: 'Conflict: Email already exists',
      });
      return;
    }
    bcrypt.hash(password, 10, ((err, hash) => {
      const newStaff = {
        id: userData.length + 1, email, firstName, lastName, password: hash, type: 'staff', isAdmin: false,
      };
      if (req.body.isAdmin === true) {
        newStaff.isAdmin = true;
      }
      const token = tokenizer({
        id: newStaff.id, email, firstName, lastName, type: newStaff.type, isAdmin: newStaff.isAdmin,
      });
      userData.push(newStaff);
      res.status(201).json({
        status: 201,
        message: 'New staff successfully created',
        data: {
          token,
          id: newStaff.id,
          email,
          firstName,
          lastName,
          type: newStaff.type,
          isAdmin: newStaff.isAdmin,
        },
      });
    }));
  }
}

export default userController;
