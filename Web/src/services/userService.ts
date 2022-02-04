import { getRepository } from 'typeorm'
import { User } from '../entities/user'
import { validate } from 'class-validator'

const createUser = async (data: Omit<User, 'id'>) => {
  try {
    const userModel = new User(data)
    const errors = await validate(userModel)

    if (errors.length) {
      return { error: errors, data: null }
    }

    const repository = getRepository(User)
    const user = await repository.save(userModel)

    return { error: null, data: user || null }
  } catch (e) {
    return { error: e, data: null }
  }
}

const getUser = async (data: Partial<User>) => {
  try {
    if (data.id && data.id.length !== 24) {
      return { error: null, data: null }
    }

    const repository = getRepository(User)
    let user: undefined | User

    if (data.id) {
      const [firstUser] = await repository.findByIds([data.id])
      user = firstUser
    } else {
      user = await repository.findOne({ ...data })
    }

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
