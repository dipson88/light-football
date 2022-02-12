import { IRequest, IResponse } from '../interfaces'
import userService from '../services/userService'
import tokenService from '../services/tokenService'
import bcrypt from 'bcryptjs'

interface ILogin {
  email: string,
  password: string
}

const loginUser = async (req: IRequest<ILogin>, res: IResponse) => {
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

export default {
  loginUser
}
