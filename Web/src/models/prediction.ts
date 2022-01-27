import { Schema, model, Types, Document } from 'mongoose'
import modelNames from './modelNames'
import { DataBaseDocument, DataBaseResult } from './modelTypes'
import { MatchResultTypes, MatchTotalTypes } from '../utils/enums'

const matchTotalValues = [0.5, 1.5, 2.5] as const
type MatchTotalValuesTuple = typeof matchTotalValues;
type MatchTotalValuesType = MatchTotalValuesTuple[number]

const isMatchTotalValues = (value: number): value is MatchTotalValuesType => {
  return matchTotalValues.includes(value as MatchTotalValuesType)
}

const isMatchResultType = (value: number): value is MatchResultTypes => {
  return Object.values(MatchResultTypes).includes(value)
}

const isMatchTotalType = (value: number): value is MatchTotalTypes => {
  return Object.values(MatchTotalTypes).includes(value)
}

interface IPrediction {
  _id: string
  postId: string
  result: MatchResultTypes
  total: MatchTotalValuesType
  totalType: MatchTotalTypes
}

interface IPredictionDocument extends Document {
  _id: Types.ObjectId
  postId: Types.ObjectId,
  result: MatchResultTypes
  total: MatchTotalValuesType
  totalType: MatchTotalTypes
}

const predictionSchema = new Schema<IPredictionDocument>({
  postId: {
    type: Types.ObjectId,
    ref: modelNames.Post,
    required: true
  },
  result: {
    type: Number,
    required: true,
    validate (value: number) {
      if (!isMatchResultType(value)) {
        throw new Error('Result value is not valid!')
      }
    }
  },
  total: {
    type: Number,
    required: true,
    validate (value: number) {
      if (!isMatchTotalValues(value)) {
        throw new Error('Total value is not valid!')
      }
    }
  },
  totalType: {
    type: Number,
    required: true,
    validate (value: number) {
      if (!isMatchTotalType(value)) {
        throw new Error('Total Type value is not valid!')
      }
    }
  }
})

const PredictionModel = model<IPredictionDocument>(modelNames.Prediction, predictionSchema)

type PredictionDataBaseDocument = DataBaseDocument<IPredictionDocument>

type PredictionDataBaseResult = DataBaseResult<IPrediction[]>

const mapPrediction = (dbPrediction: PredictionDataBaseDocument): IPrediction => {
  return {
    _id: dbPrediction._id?.toString(),
    postId: dbPrediction.postId.toString(),
    result: dbPrediction.result,
    total: dbPrediction.total,
    totalType: dbPrediction.totalType
  }
}

const createPredictionModel = async (data: IPrediction): Promise<PredictionDataBaseResult> => {
  try {
    const prediction = new PredictionModel({ ...data })
    await prediction.save()

    return { error: null, data: [mapPrediction(prediction)] }
  } catch (e) {
    return { error: e }
  }
}

const getPredictionsModel = async (data: Partial<IPrediction>): Promise<PredictionDataBaseResult> => {
  try {
    if (data._id && data._id.length !== 24) {
      return { error: null, data: [] }
    }

    const predictions = await PredictionModel.find({ ...data })

    return { error: null, data: predictions.map(prediction => mapPrediction(prediction)) }
  } catch (e) {
    return { error: e }
  }
}

export {
  createPredictionModel,
  getPredictionsModel,
  MatchTotalValuesType
}

export default {
  getPredictionsModel,
  createPredictionModel
}
