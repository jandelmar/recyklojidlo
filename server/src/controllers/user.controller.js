const status = require('http-status')
const mongoose = require('mongoose')

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
    const token = savedUser.getTokenForUser()
    res.status(status.CREATED).send({ auth: true, token, user: savedUser.safeForm() })
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

    const token = user.getTokenForUser()
    res.status(status.OK).send({ auth: true, token })
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ auth: false, token: null })
  }
}

userController.logout = (req, res) => {
  res.status(status.OK).send({ auth: false, token: null })
}

// get user by id
userController.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(status.OK).send(user.safeForm())
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send(err)
  }
}

// get all users
userController.getAll = async (req, res) => {
  try {
    const users = await User.find()
    res.status(status.OK).send(users.map(u => u.safeForm()))
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send(err)
  }
}

// test token
userController.test = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(status.OK).send({ auth: true, user: user.safeForm() })
  } catch (err) {
    res.status(status.UNAUTHORIZED).send({ auth: false })
  }
}

// refresh token
userController.refreshToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(status.OK).send({ auth: true, token: user.getTokenForUser() })
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ auth: false, err })
  }
}

// delete user by id
userController.delete = async (req, res) => {
  try {
    const removedUser = await User.findByIdAndRemove(req.params.id)
    res.status(status.OK).send({ user: removedUser.safeForm() })
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send(err)
  }
}

// update user by id
userController.update = async (req, res) => {
  try {
    const updateObj = Object.assign({}, req.body, { lastUpdated: new Date() })
    const user = await User.findByIdAndUpdate(req.params.id, updateObj, { new: true })
    res.status(status.OK).send(user.safeForm())
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send(err)
  }
}

module.exports = userController

