import userData from '../utils/users';
import tokenizer from '../Helper/tokenizer';
import hashPassword from '../Helper/hashPassword';
import emailExist from '../Helper/emailExist';

class userController {
  static signIn(req, res) {
    const { email } = req.body;
    const validUser = emailExist(email, userData);
    const { id, firstName, lastName } = validUser[0];
    const token = tokenizer({ id, email });
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
    const existingUser = emailExist(email, userData);
    if (existingUser.length > 0) {
      res.status(409).json({
        status: 409,
        error: 'Conflict: Email already exists',
      });
      return;
    }
    const hashedPassword = hashPassword(password);
    const newUser = {
      id: userData.length + 1, email, firstName, lastName, password: hashedPassword, type: 'client', isAdmin: false,
    };
    const token = tokenizer({ id: newUser.id, email });
    userData.push(newUser);
    res.status(201).json({
      status: 201,
      message: 'Sign up successful',
      data: {
        token, id: newUser.id, email, firstName, lastName, type: newUser.type,
      },
    });
  }

  static newStaff(req, res) {
    const {
      email, firstName, lastName, password,
    } = req.body;
    const existingStaff = emailExist(email, userData);
    if (existingStaff.length > 0) {
      return res.status(409).json({
        status: 409,
        error: 'Conflict: Email already exists',
      });
    }
    const hashedPassword = hashPassword(password);
    const newStaff = {
      id: userData.length + 1, email, firstName, lastName, password: hashedPassword, type: 'staff', isAdmin: false,
    };
    if (req.body.isAdmin === true) {
      newStaff.isAdmin = true;
    }
    const token = tokenizer({
      id: newStaff.id, email,
    });
    userData.push(newStaff);
    return res.status(201).json({
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
  }
}

export default userController;
