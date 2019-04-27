import decodeToken from '../Helper/decodeToken';
import userFromToken from '../Helper/userFromToken';
import userData from '../utils/users';

const client = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 401,
        error: 'No token provided',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = decodeToken(token);
    req.data = userFromToken(decoded, userData);
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      error: 'Unathorised User',
    });
  }
};

const staff = (req, res, next) => {
  if (req.data.type !== 'staff') {
    return res.status(401).json({
      status: 401,
      error: 'Unathorised User',
    });
  }
  return next();
};

const admin = (req, res, next) => {
  if (req.data.type === 'admin') {
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: 'Must be admin',
  });
};

export default { client, staff, admin };
