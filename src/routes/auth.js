import express from 'express'
import { matchedData, validationResult } from 'express-validator'

import { validateRegister } from '../utils/validators.js'
import { createUser } from '../services/user.service.js'
import { loginUser } from '../services/auth.services.js'

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
  try {
    const result = validationResult(req)
    if (result.isEmpty()) {
      const userData = matchedData(req)
      delete userData['passwordverify']

      await createUser(userData)
      req.flash('info', 'Successfully registered new user')
      return res.redirect('/auth/logon')
    }
    // Validation failed. Try again
    req.flash('error', 'Validation failed')
    res.render('auth/register', {
      title: 'Register',
      isLoggedIn: req.session.user ? true : false,
      errors: result.errors,
      data: { username: req.body.username, email: req.body.email },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/logon', async (req, res, next) => {
  try {
    res.render('auth/logon', {
      title: 'Logon',
      isLoggedIn: req.session.user ? true : false,
    })
  } catch (err) {
    next(err)
  }
})

router.post('/logon', async (req, res, next) => {
  const { email, password } = req.body
  try {
    req.session.user = await loginUser(email, password)
    if (!req.session.user) {
      return res.redirect('/auth/logon', {
        data: { email },
      })
    }
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

router.get('/logoff', async (req, res, next) => {
  try {
    req.session.destroy(() => {
      return res.redirect('/', { info: 'Logged out' })
    })
  } catch (err) {
    next(err)
  }
})

export default router
