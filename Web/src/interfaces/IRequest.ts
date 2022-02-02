import { Request } from 'express'
import { ObjectID } from 'typeorm'

export interface IRequest<T = unknown> extends Request {
  body: T,
  currentUserId?: ObjectID
}
