import { body } from 'express-validator/check';

export default [
  body('type', 'Type is required').exists(),
  body('type', 'Type must not be empty').trim().not().isEmpty(),
  body('type', 'Type must be either savings or current').isIn(['savings', 'current']),
];
