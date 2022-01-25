import { Request, Response } from 'express'
import { PostModel } from '../models/post'

const createPost = async (req: Request, res: Response) => {
  try {
    const post = new PostModel({
      ...req.body,
      userId: req.params.currentUserId
    })

    await post.save()

    return res.status(201).send(post)
  } catch (e) {
    return res.status(400).send(e)
  }
}

const getPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id
    const userId = req.params.currentUserId
    const post = await PostModel.findById(postId)

    if (!post || post.userId.toString() !== userId) {
      return res.status(404).send()
    }

    return res.status(200).send(post)
  } catch (e) {
    return res.status(404).send(e)
  }
}

export {
  createPost,
  getPost
}

export default {
  createPost,
  getPost
}
