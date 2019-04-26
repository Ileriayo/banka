import jwt from 'jsonwebtoken';

const decodeToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  return decoded;
};

export default decodeToken;
