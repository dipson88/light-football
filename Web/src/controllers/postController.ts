import { Request, Response } from 'express'
import postService from '../services/postService'

const createPost = async (req: Request, res: Response) => {
  const { error, data } = await postService.createPost({
    ...req.body,
    userId: req.body.currentUserId
  })

  if (error || !data) {
    return res.status(400).send(error)
  }

  return res.status(201).send(data)
}

const getUserPosts = async (req: Request, res: Response) => {
  const userId = req.body.currentUserId
  const { error, data } = await postService.getPosts({ userId })

  if (error) {
    return res.status(400).send(error)
  }

  if (!data || !data.length) {
    return res.status(404).send()
  }

  return res.status(200).send(data)
}

const getAllPosts = async (req: Request, res: Response) => {
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
