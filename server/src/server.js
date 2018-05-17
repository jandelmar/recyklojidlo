const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

// config
const { port } = require('../config')
const { mLabUser, mLabPassword, mLabLink } = require('../config/secrets')

// load routes
const userRoutes = require('./routes/user.route')
// const registerRoutes = require('./routes/register')

const app = express()

/* eslint no-console: "off" */
// connect to db
mongoose.connect(`mongodb://${mLabUser}:${mLabPassword}@${mLabLink}`)
mongoose.connection.on('connected', () => console.log('connected to db'))
mongoose.connection.on('error', () => console.log('error connecting to db'))

// log everything
app.use(morgan('dev'))

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// use routes
app.use('/users', userRoutes)

// hello world
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// ---
