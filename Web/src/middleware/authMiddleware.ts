import { NextFunction } from 'express'
import { IRequest, IResponse } from '../interfaces'
import authService from '../services/authService'

const authentificateUser = (req: IRequest, res: IResponse, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') ?? ''
  const decoded = authService.verifyUserToken(token)

  if (!decoded) {
    return res.status(401).send({ error: 'Please authentificate' })
  }

  req.currentUserId = decoded._id

  return next()
}

export {
  authentificateUser
}

export default {
  authentificateUser
}
