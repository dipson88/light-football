import { Schema, model, Types } from 'mongoose'
import modelNames from './modelNames'

interface Post {
  title: string
  content: string
  userId: Types.ObjectId,
  matchId: string // TODO: add ref to match
}

const postSchema = new Schema<Post>({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Types.ObjectId,
    ref: modelNames.User,
    required: true
  },
  matchId: {
    type: String,
    required: true
  }
})

const PostModel = model<Post>(modelNames.Post, postSchema)

export default PostModel

export {
  Post,
  PostModel
}
