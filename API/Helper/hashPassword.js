import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

export default hashPassword;
