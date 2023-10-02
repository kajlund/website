import path from 'node:path'

import express from 'express'
import messages from 'express-messages'
import flash from 'connect-flash'
import session from 'express-session'
import njks from 'nunjucks'

import db from './db.js'
import authRoutes from './routes/auth.js'
import indexRoutes from './routes/index.js'
import log from './utils/log.js'

const app = express()
const { configure } = njks

// Middleware for url encoding
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

// View engine
app.set('view engine', 'html')
configure('views', {
  autoescape: true,
  express: app,
})
app.set('views', path.join(process.cwd(), 'views'))

// Session handling
app.set('trust proxy', 1)
app.use(
  session({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true for https only
      maxAge: 600000 * 10, // 10 min
    },
  }),
)

app.use((req, res, next) => {
  log.info(req.session)
  next()
})

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
