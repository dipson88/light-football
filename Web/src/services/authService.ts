import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectID } from 'typeorm'

const getHashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 8)
}

const isPasswordHashMatch = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword)
}

const createUserToken = (_id: ObjectID) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET ?? '')
}

const verifyUserToken = (token: string): { _id: ObjectID } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { _id: ObjectID }

    return decoded
  } catch {
    return null
  }
}

export {
  getHashedPassword,
  isPasswordHashMatch,
  createUserToken,
  verifyUserToken
}

export default {
  getHashedPassword,
  isPasswordHashMatch,
  createUserToken,
  verifyUserToken
}
