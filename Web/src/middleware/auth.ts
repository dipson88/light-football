import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') ?? ''
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { _id: string }
    req.body.userId = decoded._id

    if (!decoded) {
      throw new Error()
    }

    return next()
  } catch {
    return res.status(401).send({ error: 'Please authentificate' })
  }
}

export {
  auth
}

export default {
  auth
}
