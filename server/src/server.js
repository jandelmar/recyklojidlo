import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import userRoutes from './routes/user.route'

import registerRoutes from './routes/register'
import { port } from '../config'
import { mLabUser, mLabPassword, mLabLink } from '../config/secrets'

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

// routes
app.use('/users', userRoutes)


// hello world
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// ---

export default app

