import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    required: true,
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 24,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  name: String,
  photo: Schema.Types.Buffer,
  addresses: Schema.Types.Array,
  aboutMe: String,
})

export default mongoose.model('User', userSchema)
