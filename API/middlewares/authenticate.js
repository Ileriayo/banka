import jwt from 'jsonwebtoken';

const client = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 401,
        error: 'No token provided',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.data = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      error: 'Unathorised Client',
    });
  }
};

const staff = (req, res, next) => {
  if (req.data.type !== 'staff') {
    return res.status(401).json({
      status: 401,
      error: 'Unathorised Staff',
    });
  }
  return next();
};

const admin = (req, res, next) => {
  if (req.data.isAdmin !== 'true') {
    return res.status(401).json({
      status: 401,
      error: 'Not an admin',
    });
  }
  return next();
};


export default { client, staff, admin };
