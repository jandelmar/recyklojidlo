const status = require('http-status')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const secrets = require('../../config/secrets')
// const config = require('../../config')
const getTokenForUser = require('../utils/userToken')
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
    const token = getTokenForUser(savedUser)
    res.status(status.CREATED).send({ auth: true, token })
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err)
  }
}

// userController.delete = async (req, res) => {
// }

// check token
userController.check = async (req, res) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) res.status(status.UNAUTHORIZED)
    const decoded = jwt.verify(token, secrets.jwtSecret)
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

    const token = getTokenForUser(user)
    res.status(status.OK).send({ auth: true, token })
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ auth: false, token: null })
  }
}

userController.logout = (req, res) => {
  res.status(status.OK).send({ auth: false, token: null })
}

module.exports = userController

