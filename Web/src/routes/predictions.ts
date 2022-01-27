import express from 'express'
import { createPrediction, getPredictions } from '../controllers/predictions'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/predicitions/create', auth, createPrediction)
router.get('/predicitions', auth, getPredictions)

export default router
