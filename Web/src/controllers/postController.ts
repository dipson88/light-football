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

const editPost = async (req: IRequest<Post>, res: IResponse) => {
  if (!req.currentUser) {
    return res.status(400).send()
  }

  const { error, data } = await postService.editPost({
    ...req.body,
    userId: req.currentUser.id,
    id: req.body.id
  })

  if (error || !data) {
    return res.status(400).send(error)
  }

  return res.status(201).send(req.body)
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

const getPost = async (
  req: IRequest<unknown, { postId?: string }>,
  res: IResponse
) => {
  const postId = req.query.postId
    ? req.query.postId.toString()
    : null

  if (!req.currentUser || !postId) {
    return res.status(400).send()
  }

  const { error, data } = await postService.getPosts({ id: postId })

  if (error) {
    return res.status(400).send(error)
  }

  const userId = req.currentUser.id

  if (!data || !data.length || data[0].userId !== userId) {
    return res.status(404).send()
  }

  return res.status(200).send(data[0])
}

const getPostsByMatchId = async (
  req: IRequest<unknown, { matchId?: string }>,
  res: IResponse
) => {
  const matchId = req.query.matchId
    ? Number(req.query.matchId)
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
    content: post.content,
    result: post.result,
    total: post.total,
    totalType: post.totalType,
    createdAt: post.cratedAt,
    updatedAt: post.updatedAt
  })))
}

export default {
  createPost,
  getUserPosts,
  getPost,
  getPostsByMatchId,
  editPost
}
