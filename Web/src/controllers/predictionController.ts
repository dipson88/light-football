import { IRequest, IResponse } from '../interfaces'
import { IPrediction } from '../entities/predicition'
import predicitionService from '../services/predicitionService'
import postService from '../services/postService'

const createPrediction = async (req: IRequest<IPrediction>, res: IResponse) => {
  const { error: errorPost, data: dataPost } = await postService.getPosts({
    _id: req.body.postId
  })

  if (errorPost || !dataPost?.length) {
    return res.status(400).send(errorPost)
  }

  const { error, data } = await predicitionService.createPrediction({
    ...req.body
  })

  if (error || !data) {
    return res.status(400).send(error)
  }

  return res.status(201).send(data)
}

const getPredictions = async (req: IRequest<IPrediction>, res: IResponse) => {
  const { error, data } = await predicitionService.getPredictions({
    ...req.body
  })

  if (error || !data) {
    return res.status(400).send(error)
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
