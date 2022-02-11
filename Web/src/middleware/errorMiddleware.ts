import { NextFunction, Request, Response } from 'express'
import { apiFrefixName } from '../utils/variables'

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    return next()
  }

  console.log(error)

  return res.status(500).send({ error })
}

const notExistControllerHandler = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes(apiFrefixName)) {
    return res.status(404).send('Controller was not found')
  }

  return next()
}

export default {
  errorHandler,
  notExistControllerHandler
}
