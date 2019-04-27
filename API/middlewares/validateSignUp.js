import { body } from 'express-validator/check';

export default [
  body('email', 'Email is required').exists(),
  body('email', 'Not a valid email').trim().isEmail(),

  body('firstName', 'First Name is required').exists(),
  body('firstName', 'First Name field must not be empty').trim().not().isEmpty(),

  body('lastName', 'Last Name is required').exists(),
  body('lastName', 'Last Name field must not be empty').not().isEmpty(),

  body('password', 'Password field is required').exists(),
  body('password', 'Password must be at least six characters').isLength({ min: 6 }),
  body('password', 'Password field must not be empty').trim().not().isEmpty(),
];
