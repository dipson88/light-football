import { Request, Response } from 'express'

const createPost = (req: Request, res: Response) => {
  // TODO add create add post method
  return res.status(201).send({ posts: [] })
}

const getPost = (req: Request, res: Response) => {
  // TODO add create get post method
  return res.status(200).send({ posts: [] })
}

export {
  createPost,
  getPost
}

export default {
  createPost,
  getPost
}
