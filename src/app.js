import path from 'node:path'

import express from 'express'
import engine from 'express-edge'

import db from './db.js'
import indexRoutes from './routes/index.js'

const app = express()

// Middleware for url encoding
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

// View engine
app.use(engine);
app.set('views', path.join(process.cwd(), 'views'))
app.disable('view cache')

app.use('/', indexRoutes)

// Connect to DB
db.connect()

export default app
