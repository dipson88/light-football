import { IRequest, IResponse } from '../interfaces'
import userService from '../services/userService'
import tokenService from '../services/tokenService'
import bcrypt from 'bcryptjs'

interface ILoginInput {
  email: string
  password: string
}

const login = async (req: IRequest<ILoginInput>, res: IResponse) => {
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

  const accessToken = tokenService.createUserToken(data.id)
  const refreshToken = tokenService.createRefreshToken(data.id)

  return res.status(200).send({
    accessToken,
    refreshToken,
    user: {
      id: data.id,
      emial: data.email,
      name: data.name
    }
  })
}

const refresh = async (req: IRequest, res: IResponse) => {
  if (!req.currentUser) {
    return res.status(401).send()
  }

  const accessToken = tokenService.createUserToken(req.currentUser.id)
  const refreshToken = tokenService.createRefreshToken(req.currentUser.id)

  return res.status(200).send({
    accessToken,
    refreshToken
  })
}

export default {
  login,
  refresh
}
