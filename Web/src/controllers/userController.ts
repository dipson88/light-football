import { IRequest, IResponse } from '../interfaces'
import userService from '../services/userService'
import { User } from '../entities/user'

const createUser = async (req: IRequest<User>, res: IResponse) => {
  const { error, data } = await userService.createUser({ ...req.body })

  if (error || !data) {
    return res.status(400).send(error)
  }

  return res.status(201).send()
}

const getUserInfo = async (req: IRequest, res: IResponse) => {
  if (req.currentUser) {
    return res.status(200).send({
      id: req.currentUser.id,
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
