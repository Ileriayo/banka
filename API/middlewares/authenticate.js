import DecodeToken from '../Helper/decodeToken';
import UserFromToken from '../Helper/userFromToken';

const { decodeToken } = DecodeToken;
const { userFromToken } = UserFromToken;

class Authenticate {
  static async client(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
          status: 401,
          error: 'No token provided',
        });
      }
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await decodeToken(token);
      req.data = await userFromToken(decoded);
      // console.log(req.data);
      
      return next();
    } catch (err) {
      return res.status(401).json({
        status: 401,
        error: 'Unathorised User',
      });
    }
  }

  static async staff(req, res, next) {
    if (req.data[0].type !== 'staff') {
      // console.log('Hererererererererer', req.data[0].type);
      
      return res.status(401).json({
        status: 401,
        error: 'Must be a Staff',
      });
    }
    return next();
  }

  static async admin(req, res, next) {
    if (req.data[0].type === 'admin') {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'Must be an Admin',
    });
  }
}


export default Authenticate;
