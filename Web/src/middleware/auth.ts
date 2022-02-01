import { Request, Response, NextFunction } from 'express'
import authService from '../services/authService'

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') ?? ''
  const decoded = authService.verifyUserToken(token)

  if (!decoded) {
    return res.status(401).send({ error: 'Please authentificate' })
  }

  req.body.currentUserId = decoded._id

  return next()
}

export {
  auth
}

export default {
  auth
}
