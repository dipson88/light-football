import { getMongoManager } from 'typeorm'
import { IUser, User } from '../entities/user'
import { validate } from 'class-validator'
import authService from './authService'

const createUser = async (data: Omit<IUser, '_id'>) => {
  try {
    const userModel = new User()
    userModel.email = data.email
    userModel.password = data.password
    userModel.name = data.name
    const errors = await validate(userModel)

    if (errors.length) {
      return { error: errors, data: null }
    }

    userModel.password = await authService.getHashedPassword(userModel.password)
    const manager = getMongoManager()
    const user = await manager.save(userModel)

    return { error: null, data: user || null }
  } catch (e) {
    return { error: e, data: null }
  }
}

const getUser = async (data: Partial<IUser>) => {
  try {
    if (data._id && data._id.toString().length !== 24) {
      return { error: null, data: null }
    }

    const manager = getMongoManager()
    const user = await manager.findOne(User, { ...data })

    return { error: null, data: user || null }
  } catch (e) {
    return { error: e, data: null }
  }
}

export default {
  createUser,
  getUser
}

export {
  createUser,
  getUser
}
