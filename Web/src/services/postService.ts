import { getMongoManager } from 'typeorm'
import { IPost, Post } from '../entities/post'
import { validate } from 'class-validator'

const createPost = async (data: Omit<IPost, '_id'>) => {
  try {
    const postModel = new Post()
    postModel.content = data.content
    postModel.title = data.title
    postModel.userId = data.userId
    postModel.matchId = data.matchId
    const errors = await validate(postModel)

    if (errors.length) {
      return { error: errors, data: null }
    }

    const manager = getMongoManager()
    const post = await manager.save(postModel)

    return { error: null, data: post || null }
  } catch (e) {
    return { error: e, data: null }
  }
}

const getPosts = async (data: Partial<IPost>) => {
  try {
    if (data._id && data._id.toString().length !== 24) {
      return { error: null, data: [] }
    }

    const manager = getMongoManager()
    const posts = await manager.find(Post, { ...data })

    return { error: null, data: posts || [] }
  } catch (e) {
    return { error: e, data: [] }
  }
}

export {
  createPost,
  getPosts
}

export default {
  createPost,
  getPosts
}
