import express from 'express'
import crypto from 'node:crypto'

const router = express.Router()

router.get('/', async (req, res, next) => {
  const user = {
    email: 'user@gmail.com',
  }

  try {
    const hash = crypto.createHash('md5').update(user.email).digest('hex')
    const avatar = `https://www.gravatar.com/avatar/${hash}?s=36`

    res.render('home', {
      title: 'Home',
      isLoggedIn: false,
      avatar,
    })
  } catch (err) {
    next(err)
  }
})

export default router
