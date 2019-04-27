import { body } from 'express-validator/check';

export default [
  body('email', 'Email is required').exists(),
  body('email', 'Not a valid email').isEmail(),

  body('password', 'Password field is required').exists().isLength({ min: 6 }),
  body('password', 'Password must be at least six characters').isLength({ min: 6 }),
  body('password', 'Password field must not be empty').trim().not().isEmpty(),
];
