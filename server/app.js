require('dotenv').config()
const express = require('express')
const cors = require('cors')

const connectDb = require('./db')
const authRoutes = require('./controllers/auth.controller')
const employeeRoutes = require('./controllers/employee.controller')
const { requireAuth } = require('./auth')
const { errorHandler } = require('./middlewares')

const app = express()
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:4200')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)

app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true)
        else callback(new Error('Origin not allowed by CORS'))
    }
}))
app.use('/api/auth', authRoutes)
app.use('/api/employees', requireAuth, (req, res, next) => {
    connectDb().then(() => next()).catch(next)
}, employeeRoutes)
app.use(errorHandler)

module.exports = app
