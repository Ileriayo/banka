import { body } from 'express-validator/check';

export default [
  body('status', 'Status is required').exists(),
  body('status', 'Status must not be empty').trim().not().isEmpty(),
  body('status', 'Status must be either active or dormant').isIn(['active', 'dormant']),
];
