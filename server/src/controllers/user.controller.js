import status from 'http-status'
import User from '../models/user.model'

export const create = async (req, res, next) => {
  try {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.status(status.CREATED)
    res.json(savedUser)
  } catch (error) {
    next()
  }
}

export const get = async (req, res, next, id) => {
  try {
    const user = await User.get(id)
    res.status(status.OK)
    res.json(user)
  } catch (error) {
    next()
  }
}

