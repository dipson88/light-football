import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO add real user check
    const token = req.header('Authorization')?.replace('Bearer ', '') ?? ''
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')

    if (!decoded) {
      throw new Error()
    }

    next()
  } catch {
    res.status(401).send({ error: 'Please authentificate' })
  }
}

export {
  auth
}

export default {
  auth
}
