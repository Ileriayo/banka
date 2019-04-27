import jwt from 'jsonwebtoken';

class DecodeToken {
  static async decodeToken(token) {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  }
}

export default DecodeToken;
