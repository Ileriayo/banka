import userData from '../utils/users';

const signInValidation = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  const existingUser = userData.find(user => user.email === email);

  if (!email) {
    res.json({ status: 400, error: 'Email field is required' }).status(400);
  } else if (!password) {
    res.json({ status: 400, error: 'Password field is required' }).status(400);
  } else if (!existingUser) {
    res.json({ status: 404, error: 'User not found' }).status(404);
  } else if (password !== existingUser.password) {
    res.json({ status: 403, error: 'Incorrect password' }).status(403);
  } else next();
};

export default signInValidation;
