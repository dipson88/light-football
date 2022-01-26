import { Request, Response } from 'express'
import { createUserModel, getUserModel, IUser, createUserToken, isPasswordHashMatch } from '../models/user'

const createUser = async (req: Request, res: Response) => {
  const { error, data } = await createUserModel({
    ...req.body
  })

  if (error || !data) {
    return res.status(400).send(error)
  }

  const token = createUserToken(data._id)

  return res.status(201).send({
    token,
    user: {
      id: data._id,
      emial: data.email,
      name: data.name
    }
  })
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as IUser
  const { error, data } = await getUserModel({ email })

  if (error || !data || !isPasswordHashMatch(password, data.password)) {
    return res.status(400).send(error)
  }

  const token = createUserToken(data._id)

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
