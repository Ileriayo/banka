import bcrypt from 'bcryptjs';
import userData from '../utils/users';


const signInValidation = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  if (!email) {
    return res.status(400).json({ status: 400, error: 'Email field is required' });
  }
  if (!password) {
    return res.status(400).json({ status: 400, error: 'Password field is required' });
  }
  const existingUser = userData.find(user => user.email === email);
  if (!existingUser) {
    return res.status(404).json({ status: 404, error: 'Auth failed' });
  }
  const validPassword = bcrypt.compareSync(password, existingUser.password);
  if (!validPassword) return res.status(401).json({ status: 401, error: 'Password incorrect' });
  return next();
};

export default signInValidation;
