import { Request } from 'express'
import { User } from '../entities/user'
import { ParsedQs } from 'qs'

export interface IRequest<T = unknown, U extends ParsedQs = ParsedQs> extends Request {
  body: T
  query: U
  currentUser?: User
}
