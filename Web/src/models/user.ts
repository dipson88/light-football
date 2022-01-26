import { Schema, model, Types } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import modelNames from './modelNames'
import { DataBaseDocument, DataBaseResult } from './modelTypes'

interface IUser {
  _id: string
  email: string
  password: string
  name: string
}

interface IUserDocument extends Document {
  _id: Types.ObjectId
  email: string
  password: string
  name: string
}

const userSchema = new Schema<IUserDocument>({
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

const UserModel = model<IUserDocument>(modelNames.User, userSchema)

type UserDataBaseDocument = DataBaseDocument<IUserDocument>

type UserDataBaseResult = DataBaseResult<IUser>

const getHashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 8)
}

const isPasswordHashMatch = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword)
}

const createUserToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET ?? '')
}

const verifyUserToken = (token: string): { _id: string } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { _id: string }

    return decoded
  } catch {
    return null
  }
}

const mapUser= (dbUser: UserDataBaseDocument): IUser => {
  return {
    _id: dbUser._id?.toString(),
    email: dbUser.email,
    password: dbUser.password,
    name: dbUser.name
  }
}

const createUserModel = async (data: IUser): Promise<UserDataBaseResult> => {
  try {
    const user = new UserModel({ ...data })
    await user.validate()
    user.password = await getHashedPassword(user.password)
    await user.save()

    return { error: null, data: mapUser(user) }
  } catch (e) {
    return { error: e }
  }
}

const getUserModel = async (data: Partial<IUser>): Promise<UserDataBaseResult> => {
  try {
    if (data._id && data._id.length !== 24) {
      return { error: null, data: null }
    }

    const user = await UserModel.findOne({ ...data })
    const resultData = user ? mapUser(user) : null

    return { error: null, data: resultData }
  } catch (e) {
    return { error: e }
  }
}

export {
  IUser,
  isPasswordHashMatch,
  createUserToken,
  verifyUserToken,
  createUserModel,
  getUserModel
}

export default {
  isPasswordHashMatch,
  createUserToken,
  verifyUserToken,
  createUserModel,
  getUserModel
}
