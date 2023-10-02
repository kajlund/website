import { body } from 'express-validator'
import { findOne } from '../utils/dao.js'

export const validateRegister = [
  body('username', 'Username is required').trim().escape().notEmpty(),
  body('email', 'Email is required')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Email needs to be a valid email address')
    .custom(async (value) => {
      const user = await findOne('Users', { email: value })
      if (user) throw new Error('User is already registered')
      return true
    }),
  body('password', 'Password is required')
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('passwordverify', 'Passwords need to match').custom((pwd, { req }) => {
    if (pwd !== req.body.password) {
      throw new Error('Passwords must match')
    }
    return true
  }),
]

export const validateLogon = [
  body('email', 'Email is required').trim().notEmpty().isEmail().withMessage('Email needs to be a valid email address'),
  body('password', 'Password is required').trim().notEmpty(),
]
