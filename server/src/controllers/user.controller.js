const status = require('http-status')
const mongoose = require('mongoose')

const models = require('../models')

const userController = {}

userController.create = async (req, res) => {
  try {
    const { username, password, name, email } = req.body
    const user = new models.User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password,
      name,
    })
    const savedUser = await user.save()
    res.status(status.CREATED).json(savedUser)
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err)
  }
}

module.exports = userController

