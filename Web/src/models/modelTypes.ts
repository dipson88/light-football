import { Types, Document } from 'mongoose'

export type DataBaseDocument<T> = Document & T & { _id: Types.ObjectId | undefined }

export type DataBaseResult<T> = { error: null | unknown, data?: T | null }
