import { NextFunction, Request, Response, ErrorRequestHandler } from 'express'

const errorHandler = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    return next()
  }

  console.log(error)

  return res.status(500).send({ error })
}

export default errorHandler
