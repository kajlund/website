import express from 'express'

import db from './db.js'

const app = express()

// Middleware for url encoding
app.use(express.urlencoded({ extended: false }))

// Connect to DB
db.connect()

export default app
