import { Request, Response } from 'express'
import { createPostModel, getPostsModel } from '../models/post'

const createPost = async (req: Request, res: Response) => {
  const { error, data } = await createPostModel({
    ...req.body,
    userId: req.params.currentUserId
  })

  if (error || !data) {
    return res.status(400).send(error)
  }

  const [post] = data

  return res.status(201).send(post)
}

const getPost = async (req: Request, res: Response) => {
  const postId = req.params.id
  const userId = req.params.currentUserId
  const { error, data } = await getPostsModel({ _id: postId, userId })

  if (error) {
    return res.status(400).send(error)
  }

  if (!data || !data.length) {
    return res.status(404).send()
  }

  const [post] = data

  return res.status(200).send(post)
}

export {
  createPost,
  getPost
}

export default {
  createPost,
  getPost
}
