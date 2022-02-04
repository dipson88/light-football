import { IRequest, IResponse } from '../interfaces'
import userService from '../services/userService'
import tokenService from '../services/tokenService'
import { User } from '../entities/user'
import bcrypt from 'bcryptjs'

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

const loginUser = async (req: IRequest<User>, res: IResponse) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send()
  }

  const { email, password } = req.body
  const { error, data } = await userService.getUser({ email })
  const isError = error || !data
  const isRightPassword = !isError && await bcrypt.compare(password, data.password)

  if (isError || !isRightPassword) {
    return res.status(400).send(error)
  }

  const token = tokenService.createUserToken(data.id)

  return res.status(200).send({
    token,
    user: {
      id: data.id,
      emial: data.email,
      name: data.name
    }
  })
}

export {
  createUser,
  loginUser
}

export default {
  createUser,
  loginUser
}
