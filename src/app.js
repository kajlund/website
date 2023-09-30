import path from 'node:path'

import express from 'express'
import messages from 'express-messages'
import flash from 'connect-flash'
// import passport from 'passport'
import session from 'express-session'
import njks from 'nunjucks'

import db from './db.js'
import indexRoutes from './routes/index.js'
import authRoutes from './routes/auth.js'

const app = express()
const { configure } = njks

// Middleware for url encoding
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

// View engine
app.set('view engine', 'html')
configure('views', {
  autoescape: true,
  express: app,
})
app.set('views', path.join(process.cwd(), 'views'))

// Session handling
app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  }),
)

// Flash messages
app.use(flash())
app.use((req, res, next) => {
  res.locals.messages = messages(req, res)
  next()
})

app.use('/', indexRoutes)
app.use('/auth', authRoutes)

// Connect to DB
db.connect()

export default app
