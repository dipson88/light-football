import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel, User } from '../models/user'

const getHashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 8)
}

const getToken = async (_id: string) => {
  // TODO move env variables to the config file
  return jwt.sign({ _id }, process.env.JWT_SECRET || 'thisistest')
}

const isPasswordMatch = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword)
}

const createUser = async (req: Request, res: Response) => {
  const user = new UserModel(req.body)

  try {
    await user.validate()
    user.password = await getHashedPassword(user.password)
    await user.save()
    const token = await getToken(user._id.toString())

    res.status(201).send({
      token,
      user: {
        id: user._id,
        emial: user.email,
        name: user.name
      }
    })
  } catch (e) {
    res.status(400).send(e)
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new Error('Unable to login')
    }

    if (!isPasswordMatch(password, user.password)) {
      throw new Error('Unable to login')
    }

    const token = await getToken(user._id.toString())

    res.status(201).send({
      token,
      user: {
        id: user._id,
        emial: user.email,
        name: user.name
      }
    })
  } catch (e) {
    res.status(400).send(e)
  }
}

export {
  createUser,
  loginUser
}

export default {
  createUser,
  loginUser
}
