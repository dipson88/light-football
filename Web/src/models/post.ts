import { Schema, model, Types, Document } from 'mongoose'
import modelNames from './modelNames'
import { DataBaseDocument, DataBaseResult } from './modelTypes'

interface IPost {
  _id: string,
  title: string
  content: string
  userId: string
  matchId: string
}
interface IPostDocument extends Document {
  _id: Types.ObjectId
  title: string
  content: string
  userId: Types.ObjectId,
  matchId: string // TODO: add ref to match
}

const postSchema = new Schema<IPostDocument>({
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
},
{
  timestamps: true
})

const PostModel = model<IPostDocument>(modelNames.Post, postSchema)

type PostDataBaseDocument = DataBaseDocument<IPostDocument>

type PostDataBaseResult = DataBaseResult<IPost[]>

const mapPost = (dbPost: PostDataBaseDocument): IPost => {
  return {
    _id: dbPost._id?.toString(),
    title: dbPost.title,
    content: dbPost.content,
    userId: dbPost.userId.toString(),
    matchId: dbPost.matchId
  }
}

const createPostModel = async (data: IPost): Promise<PostDataBaseResult> => {
  try {
    const post = new PostModel({ ...data })
    await post.save()

    return { error: null, data: [mapPost(post)] }
  } catch (e) {
    return { error: e }
  }
}

const getPostsModel = async (data: Partial<IPost>): Promise<PostDataBaseResult> => {
  try {
    if (data._id && data._id.length !== 24) {
      return { error: null, data: [] }
    }

    const posts = await PostModel.find({ ...data })

    return { error: null, data: posts.map(post => mapPost(post)) }
  } catch (e) {
    return { error: e }
  }
}

export {
  createPostModel,
  getPostsModel
}

export default {
  createPostModel,
  getPostsModel
}
