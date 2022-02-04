import { IRequest, IResponse } from '../interfaces'
import postService from '../services/postService'
import { Post } from '../entities/post'

const createPost = async (req: IRequest<Post>, res: IResponse) => {
  if (!req.currentUser) {
    return res.status(400).send()
  }

  const { error, data } = await postService.createPost({
    ...req.body,
    userId: req.currentUser.id
  })

  if (error || !data) {
    return res.status(400).send(error)
  }

  return res.status(201).send(data)
}

const getUserPosts = async (req: IRequest, res: IResponse) => {
  if (!req.currentUser) {
    return res.status(400).send()
  }

  const userId = req.currentUser.id
  const { error, data } = await postService.getPosts({ userId })

  if (error) {
    return res.status(400).send(error)
  }

  if (!data || !data.length) {
    return res.status(404).send()
  }

  return res.status(200).send(data)
}

const getAllPosts = async (req: IRequest, res: IResponse) => {
  const { error, data } = await postService.getPosts({})

  if (error) {
    return res.status(400).send(error)
  }

  if (!data || !data.length) {
    return res.status(404).send()
  }

  return res.status(200).send(data)
}

export {
  createPost,
  getUserPosts,
  getAllPosts
}

export default {
  createPost,
  getUserPosts,
  getAllPosts
}
