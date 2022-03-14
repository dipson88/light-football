import { getRepository } from 'typeorm'
import { Post } from '../entities/post'
import { validate } from 'class-validator'

const createPost = async (data: Omit<Post, 'id'>) => {
  try {
    const postModel = new Post(data)
    const errors = await validate(postModel)

    if (errors.length) {
      return { error: errors, data: null }
    }

    const repository = getRepository(Post)
    const post = await repository.save(postModel)

    return { error: null, data: post || null }
  } catch (e) {
    return { error: e, data: null }
  }
}

const getPosts = async (data: Partial<Post>) => {
  try {
    if (data.id && data.id.length !== 24) {
      return { error: null, data: [] }
    }

    const repository = getRepository(Post)
    let posts: undefined | Post[] = []

    if (data.id) {
      posts = await repository.findByIds([data.id])
    } else {
      posts = await repository.find({ ...data })
    }

    return { error: null, data: posts || [] }
  } catch (e) {
    return { error: e, data: [] }
  }
}

const editPost = async (data: Omit<Post, '_id'>) => {
  try {
    const errors = await validate(data)

    if (errors.length) {
      return { error: errors, data: null }
    }

    if (data.id && data.id.length !== 24) {
      return { error: null, data: [] }
    }

    const repository = getRepository(Post)
    const postModel = new Post(data)

    await repository.update(data.id, {
      ...postModel,
      updatedAt: new Date()
    })

    return { error: null, data: data || null }
  } catch (e) {
    return { error: e, data: null }
  }
}

export {
  createPost,
  getPosts,
  editPost
}

export default {
  createPost,
  getPosts,
  editPost
}
