import status from 'http-status'
import mongoose from 'mongoose'
import models from '../models'

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

export default userController

