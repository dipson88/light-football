import express from 'express'
import predictionController from '../controllers/predictionController'
import { authentificateUser } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/predicitions/create', authentificateUser, predictionController.createPrediction)
router.get('/predicitions', authentificateUser, predictionController.getPredictions)

export default router
