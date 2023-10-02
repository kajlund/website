import express from 'express'

const router = express.Router()

router.get('/', async (req, res, next) => {
  const user = req.session ? req.session.user : null

  try {
    res.render('home', {
      title: 'Home',
      isLoggedIn: req.session.user ? true : false,
      user,
    })
  } catch (err) {
    next(err)
  }
})

export default router
