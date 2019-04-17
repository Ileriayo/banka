/* eslint-disable consistent-return */

const signUpValidation = (req, res, next) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  if (!firstName) {
    return res.json({
      status: 400,
      error: 'Firstname field is required',
    }).status(400);
  }
  if (!lastName) {
    return res.json({
      status: 400,
      error: 'Lastname field is required',
    }).status(400);
  }
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
  next();
};

export default signUpValidation;
