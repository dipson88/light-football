import { getRepository } from 'typeorm'
import { Prediction } from '../entities/predicition'
import { validate } from 'class-validator'

const createPrediction = async (data: Omit<Prediction, 'id'>) => {
  try {
    const predicitionModel = new Prediction(data)
    const errors = await validate(predicitionModel)

    if (errors.length) {
      return { error: errors, data: null }
    }

    const repository = getRepository(Prediction)
    const predicition = await repository.save(predicitionModel)

    return { error: null, data: predicition || null }
  } catch (e) {
    return { error: e, data: null }
  }
}

const getPredictions = async (data: Partial<Prediction>) => {
  try {
    if (data.id && data.id.length !== 24) {
      return { error: null, data: null }
    }

    const repository = getRepository(Prediction)
    let predictions: undefined | Prediction[] = []

    if (data.id) {
      predictions = await repository.findByIds([data.id])
    } else {
      predictions = await repository.find({ ...data })
    }

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
