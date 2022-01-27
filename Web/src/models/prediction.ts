import { Schema, model, Types, Document } from 'mongoose'
import modelNames from './modelNames'
import { DataBaseDocument, DataBaseResult } from './modelTypes'
import { MatchTotalValueTypes } from '../utils/types'
import { MatchResultTypes, MatchTotalTypes } from '../utils/enums'

interface IPrediction {
  _id: string
  postId: string
  result: MatchResultTypes
  total: MatchTotalValueTypes
  totalType: MatchTotalTypes
}

interface IPredictionDocument extends Document {
  _id: Types.ObjectId
  postId: Types.ObjectId,
  result: MatchResultTypes
  total: MatchTotalValueTypes
  totalType: MatchTotalTypes
}

// https://dev.to/hansott/how-to-check-if-string-is-member-of-union-type-1j4m
const checker = (value: number): value is MatchTotalValueTypes => {
  return [0.1].includes(value as MatchTotalValueTypes)
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
      if (!checker(value)) {
        throw new Error('Reulst value is not valid!')
      }
    }
  },
  total: {
    type: Number,
    required: true
  },
  totalType: {
    type: Number,
    required: true
  }
})

const PredictionModel = model<IPredictionDocument>(modelNames.Prediction, predictionSchema)

type PredictionDataBaseDocument = DataBaseDocument<IPredictionDocument>

type PredictionDataBaseResult = DataBaseResult<IPrediction>

const mapPrediction = (dbPrediction: PredictionDataBaseDocument): IPrediction => {
  return {
    _id: dbPrediction._id?.toString(),
    postId: dbPrediction._id.toString(),
    result: dbPrediction.result,
    total: dbPrediction.total,
    totalType: dbPrediction.totalType
  }
}

const createPredictionModel = async (data: IPrediction): Promise<PredictionDataBaseResult> => {
  try {
    const prediction = new PredictionModel({ ...data })
    await prediction.save()

    return { error: null, data: mapPrediction(prediction) }
  } catch (e) {
    return { error: e }
  }
}

export {
  createPredictionModel
}

export default {
  createPredictionModel
}
