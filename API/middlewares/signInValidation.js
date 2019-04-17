/* eslint-disable consistent-return */
import userData from '../utils/users';

const signInValidation = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  if (!email) {
    return res.json({
      status: 400,
      error: 'Email field is required',
    }).status(400);
  }

  if (!password) {
    return res.json({
      status: 400,
      error: 'Password field is required',
    }).status(400);
  }

  const existingUser = userData.find(user => user.email === email);
  if (!existingUser) {
    return res.json({
      status: 404,
      error: 'User not found',
    }).status(404);
  }

  if (!password !== userData.password) {
    return res.json({
      status: 403,
      error: 'Incorrect password',
    }).status(403);
  }

  next();
};

export default signInValidation;
