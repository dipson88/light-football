import { Request } from 'express'
import { User } from '../entities/user'

export interface IRequest<T = unknown> extends Request {
  body: T,
  currentUser?: User
}
