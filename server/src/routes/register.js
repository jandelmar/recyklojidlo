import express from 'express'
import mongoose from 'mongoose'

import User from '../models/user'

const router = express.Router();

router.post('/', (req, res) => {
  // register user
  const { username, password, email } = req.body
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    // TODO: hash the password
    password,
    email,
  })

  /* eslint no-console: "off" */
  user.save().then((result) => {
    console.log(result)
    res.status(201).json({
      message: 'User created',
      user,
    })
  }).catch((err) => {
    console.log(err)
    res.status(500).json(err)
  })
})

export default router
