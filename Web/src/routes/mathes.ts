import express from 'express'
import { getAllMatches } from '../controllers/mathes'
import { authentificateUser } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/matches/all', authentificateUser, getAllMatches)

export default router
