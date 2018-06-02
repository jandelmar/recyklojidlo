const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { hashRounds } = require('../../config')

const { Schema } = mongoose

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    required: true,
    type: String,
    unique: true,
    maxlength: 64,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
    maxlength: 64,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
  },
  name: String,
  photo: Schema.Types.Buffer,
  addresses: Schema.Types.Array,
  aboutMe: String,
})

// hash password
userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next()

    const hash = await bcrypt.hash(this.password, hashRounds)
    this.password = hash

    return next()
  } catch (error) {
    return next(error)
  }
})

userSchema.method({
  async passwordMatches(pass) {
    return bcrypt.compare(pass, this.password)
  },
  // transform user info into safe form
  safeForm() {
    const transformedUser = {
      email: this.email,
      username: this.username,
      name: this.name,
    }
    return transformedUser
  },
})

const User = mongoose.model('User', userSchema)


module.exports = User
