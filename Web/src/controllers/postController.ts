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

const getPostsByMatchId = async (req: IRequest, res: IResponse) => {
  const matchId = req.query.matchId
    ? req.query.matchId.toString()
    : null

  if (!matchId) {
    return res.status(200).send([])
  }

  const { error, data } = await postService.getPosts({ matchId })

  if (error) {
    res.status(400).send([])
  }

  return res.status(200).send(data.map(post => ({
    id: post.id,
    userId: post.userId,
    matchId: Number(post.matchId),
    title: post.title,
    content: post.content,
    createdAt: post.cratedAt,
    updatedAt: post.updatedAt
  })))
}

export default {
  createPost,
  getUserPosts,
  getAllPosts,
  getPostsByMatchId
}
