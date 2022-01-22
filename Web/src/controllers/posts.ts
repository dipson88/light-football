import { Request, Response } from 'express'

const createPost = (req: Request, res: Response) => {
  // TODO add create add post method
  res.status(201).send({ posts: [] })
}

export {
  createPost
}

export default {
  createPost
}
