import { IRequest, IResponse } from '../interfaces'
import userService from '../services/userService'
import tokenService from '../services/tokenService'
import { User } from '../entities/user'

const createUser = async (req: IRequest<User>, res: IResponse) => {
  const { error, data } = await userService.createUser({ ...req.body })

  if (error || !data) {
    return res.status(400).send(error)
  }

  const token = tokenService.createUserToken(data.id)

  return res.status(201).send({
    token,
    user: {
      id: data.id,
      email: data.email,
      name: data.name
    }
  })
}

const getUserInfo = async (req: IRequest, res: IResponse) => {
  if (req.currentUser) {
    return res.status(200).send({
      name: req.currentUser.name,
      createdAt: req.currentUser.cratedAt,
      updatedAt: req.currentUser.updatedAt
    })
  }

  return res.status(400).send(null)
}

export default {
  createUser,
  getUserInfo
}
