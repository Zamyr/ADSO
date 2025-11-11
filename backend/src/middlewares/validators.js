import { body, param, validationResult } from 'express-validator';

export const validateProfileCreate = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 255 }).withMessage('Username must be between 3 and 255 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Bio must not exceed 1000 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateProfileUpdate = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 255 }).withMessage('Username must be between 3 and 255 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Email must be valid'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Bio must not exceed 1000 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateProfileId = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
