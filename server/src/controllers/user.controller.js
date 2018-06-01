const status = require('http-status')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const secrets = require('../../config/secrets')
const config = require('../../config')
const { User } = require('../models')

const userController = {}

// create new user
userController.create = async (req, res) => {
  try {
    const { username, password, name, email } = req.body
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password,
      name,
    })
    const savedUser = await user.save()
    const token = await jwt.sign({ id: savedUser._id }, secrets.jwtSecret, {
      // expire time 24 hours
      expiresIn: config.tokenExpire,
    })
    res.status(status.CREATED).send({ auth: true, token })
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err)
  }
}

// check token
userController.check = async (req, res) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) res.status(status.UNAUTHORIZED)
    const decoded = await jwt.verify(token, secrets.jwtSecret)
    const user = await User.findById(decoded.id)
    res.status(status.OK).send(user.safeForm())
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err)
  }
}

// login
userController.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const passwordMatch = await user.passwordMatches(password)
    if (!passwordMatch) res.status(status.UNAUTHORIZED).send({ auth: false, token: null })

    const token = await jwt.sign({ id: user._id }, secrets.jwtSecret, {
      expiresIn: config.tokenExpire,
    })
    res.status(status.OK).send({ auth: true, token })
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ auth: false, token: null })
  }
}

module.exports = userController

