import { Schema, model, Types } from 'mongoose'
import modelNames from './modelNames'

interface Post {
  title: string
  content: string
  userId: Types.ObjectId
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
    ref: modelNames.User
  }
})

const PostModel = model<Post>(modelNames.Post, postSchema)

export default PostModel

export {
  Post,
  PostModel
}
