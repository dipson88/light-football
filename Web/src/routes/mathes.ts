import express from 'express'
import { getAllMatches } from '../controllers/mathes'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/matches/all', auth, getAllMatches)

export default router
