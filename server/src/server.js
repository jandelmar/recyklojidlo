import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import registerRoutes from './routes/register'

import { port } from '../config'
import { mLabPassword } from '../config/secrets'

const app = express()

// connect to db
mongoose.connect(`mongodb://app:${mLabPassword}@ds261929.mlab.com:61929/recyklojidlo`)
mongoose.connection.on('connected', () => console.log('connected to db'))
mongoose.connection.on('error', () => console.log('error connecting to db'))

// log everything
app.use(morgan('dev'))

// body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// routes
app.use('/register', registerRoutes)


// hello world
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// ---

export default app

