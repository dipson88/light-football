import express from 'express'
import { createPrediction, getPredictions } from '../controllers/predictionController'
import { authentificateUser } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/predicitions/create', authentificateUser, createPrediction)
router.get('/predicitions', authentificateUser, getPredictions)

export default router
