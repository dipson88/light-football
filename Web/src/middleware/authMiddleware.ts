import { NextFunction } from 'express'
import { IRequest, IResponse } from '../interfaces'
import tokenService from '../services/tokenService'
import userService from '../services/userService'

const checkAuthentificate = async (
  req: IRequest,
  res: IResponse,
  next: NextFunction,
  isRefresh: boolean
) => {
  const status = isRefresh ? 401 : 403
  const token = req.header('Authorization')?.replace('Bearer ', '') ?? ''
  const decoded = isRefresh
    ? tokenService.verifyRefreshToken(token)
    : tokenService.verifyUserToken(token)

  if (decoded == null) {
    return res.status(status).send({ error: 'Update Token' })
  }

  const { error, data } = await userService.getUser({ id: decoded.userId })

  if (error || !data) {
    return res.status(status).send({ error: 'Update Token' })
  }

  req.currentUser = data

  return next()
}

const authentificateUser = async (
  req: IRequest,
  res: IResponse,
  next: NextFunction
) => await checkAuthentificate(req, res, next, false)

const authentificateRefreshToken = async (
  req: IRequest,
  res: IResponse,
  next: NextFunction
) => await checkAuthentificate(req, res, next, true)

export { authentificateUser, authentificateRefreshToken }

export default {
  authentificateUser,
  authentificateRefreshToken
}
