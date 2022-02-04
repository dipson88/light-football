import { NextFunction } from 'express'
import { IRequest, IResponse } from '../interfaces'
import tokenService from '../services/tokenService'
import userService from '../services/userService'

const authentificateUser = async (req: IRequest, res: IResponse, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') ?? ''
  const decoded = tokenService.verifyUserToken(token)

  if (!decoded) {
    return res.status(401).send({ error: 'Please authentificate' })
  }

  const { error, data } = await userService.getUser({ id: decoded.userId })

  if (error || !data) {
    return res.status(401).send({ error: 'Please authentificate' })
  }

  req.currentUser = data

  return next()
}

export {
  authentificateUser
}

export default {
  authentificateUser
}
