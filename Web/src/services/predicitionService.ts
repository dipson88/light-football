import { getMongoManager } from 'typeorm'
import { IPrediction, Prediction } from '../entities/predicition'
import { validate } from 'class-validator'

const createPrediction = async (data: Omit<IPrediction, '_id'>) => {
  try {
    const predicitionModel = new Prediction()
    predicitionModel.result = data.result
    predicitionModel.total = data.total
    predicitionModel.totalType = data.totalType
    predicitionModel.postId = data.postId
    const errors = await validate(predicitionModel)

    if (errors.length) {
      return { error: errors, data: null }
    }

    const manager = getMongoManager()
    const predicition = await manager.save(predicitionModel)

    return { error: null, data: predicition || null }
  } catch (e) {
    return { error: e, data: null }
  }
}

const getPredictions = async (data: Partial<IPrediction>) => {
  try {
    if (data._id && data._id.toString().length !== 24) {
      return { error: null, data: null }
    }

    const manager = getMongoManager()
    const predictions = await manager.findOne(Prediction, { ...data })

    return { error: null, data: predictions || [] }
  } catch (e) {
    return { error: e, data: null }
  }
}

export default {
  createPrediction,
  getPredictions
}

export {
  createPrediction,
  getPredictions
}
