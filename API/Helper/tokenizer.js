import jwt from 'jsonwebtoken';

const tokenizer = (payload, expiresIn = '365d') => {
  const token = jwt.sign(
    payload,
    process.env.JWT_KEY,
    { expiresIn },
  );
  return token;
};

export default tokenizer;
