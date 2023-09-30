import { body } from 'express-validator'

export const validateRegister = [
  body('username', 'Username is required')
    .trim().escape().notEmpty(),
  body('email', 'Email is required and needs to be valid')
    .trim().notEmpty().isEmail(),
  body('password', 'Password is required')
    .notEmpty(),
  body('passwordverify', 'Passwords need to match')
    .custom((pwd, {req}) => {
      if (pwd !== req.body.password) {
        throw new Error('Passwords must match')
      }
    })
]