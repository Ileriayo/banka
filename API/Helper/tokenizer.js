import jwt from 'jsonwebtoken';

class Tokenizer {
  static tokenizer(payload, expiresIn = '1h') {
    const token = jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn },
    );
    return token;
  }
}

export default Tokenizer;
