import { Request, Response } from 'express'
import { createPredictionModel, getPredictionsModel } from '../models/prediction'
import { getPostsModel } from '../models/post'

const createPrediction = async (req: Request, res: Response) => {
  const { error: errorPost, data: dataPost } = await getPostsModel({
    _id: req.body.postId
  })

  if (errorPost || !dataPost?.length) {
    return res.status(400).send(errorPost)
  }

  const { error, data } = await createPredictionModel({
    ...req.body
  })

  if (error || !data) {
    return res.status(400).send(error)
  }

  const [predicition] = data

  return res.status(201).send(predicition)
}

const getPredictions = async (req: Request, res: Response) => {
  const { error, data } = await getPredictionsModel({ ...req.body })

  if (error) {
    return res.status(400).send(error)
  }

  if (!data || !data.length) {
    return res.status(404).send()
  }

  return res.status(200).send(data)
}

export {
  createPrediction,
  getPredictions
}

export default {
  createPrediction,
  getPredictions
}
