import express from 'express'
import { validationResult } from 'express-validator'

import { validateRegister } from '../utils/validators.js'

const router = express.Router()

router.get('/register', async (req, res, next) => {
  try {
    res.render('auth/register', {
      pageTitle: 'Register',
      isLoggedIn: false,
    })
  } catch (err) {
    next(err)
  }
})

router.post('/register', validateRegister, async (req, res, next) => {
  const { username, email, password, passwordverify } = req.body
  try {
    const result = validationResult(req)
    if (result.isEmpty()) {
      return res.send(`Hello, ${req.query.person}!`)
    }
    res.render('auth/register', {
      title: 'Register',
      isLoggedIn: false,
      errors: result.errors,
    })
  } catch (err) {
    next(err)
  }
})

router.get('/logon', async (req, res, next) => {
  try {
    res.render('auth/logon', {
      title: 'Logon',
      isLoggedIn: false,
    })
  } catch (err) {
    next(err)
  }
})

router.post('/logon', async (res, req, next) => {
  try {
  } catch (err) {}
})

export default router
