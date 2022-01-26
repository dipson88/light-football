import { Request, Response, NextFunction } from 'express'
import { verifyUserToken } from '../models/user'

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') ?? ''
  const decoded = verifyUserToken(token)

  if (!decoded) {
    return res.status(401).send({ error: 'Please authentificate' })
  }

  req.params.currentUserId = decoded._id

  return next()
}

export {
  auth
}

export default {
  auth
}
