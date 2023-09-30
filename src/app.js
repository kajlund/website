import path from 'node:path'

import express from 'express'
import messages from 'express-messages'
import njks from 'nunjucks'

import db from './db.js'
import indexRoutes from './routes/index.js'

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
app.disable('view cache')

app.use('/', indexRoutes)

// Connect to DB
db.connect()

export default app
