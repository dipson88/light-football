import { Schema, model } from 'mongoose'
import validator from 'validator'

interface User {
  email: string
  password: string
  name: string
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate (value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid!')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate (value: string) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain the "password"!')
      }
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
},
{
  timestamps: true
})

const UserModel = model<User>('User', userSchema)

export default UserModel

export {
  UserModel,
  User
}
