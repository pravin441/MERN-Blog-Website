import { body } from 'express-validator'

const emailRule = body('email')
  .trim()
  .toLowerCase()
  .notEmpty()
  .withMessage('Email is required')
  .bail()
  .isEmail()
  .withMessage('Enter a valid email address')

export const registerRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  emailRule,
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 6, max: 64 })
    .withMessage('Password must be between 6 and 64 characters'),
]

export const loginRules = [
  emailRule,
  body('password').notEmpty().withMessage('Password is required'),
]