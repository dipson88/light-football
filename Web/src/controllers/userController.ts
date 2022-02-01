import { Request, Response } from 'express'
import userService from '../services/userService'
import authService from '../services/authService'
import { IUser } from '../entities/user'

const createUser = async (req: Request, res: Response) => {
  const { error, data } = await userService.createUser({ ...req.body })

  if (error || !data) {
    return res.status(400).send(error)
  }

  const token = authService.createUserToken(data._id)

  return res.status(201).send({
    token,
    user: {
      id: data._id,
      email: data.email,
      name: data.name
    }
  })
}

const loginUser = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send()
  }

  const { email, password } = req.body as IUser
  const { error, data } = await userService.getUser({ email })
  const isError = error || !data
  const isRightPassword = !isError && await authService.isPasswordHashMatch(password, data.password)

  if (isError || !isRightPassword) {
    return res.status(400).send(error)
  }

  const token = authService.createUserToken(data._id)

  return res.status(200).send({
    token,
    user: {
      id: data._id,
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
