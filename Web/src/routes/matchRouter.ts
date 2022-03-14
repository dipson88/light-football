import express from 'express'
import matchController from '../controllers/matchController'
import { authentificateUser } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/matches/all', authentificateUser, matchController.getAllMatches)
router.get('/matches/match-info', authentificateUser, matchController.getMatchInfo)

export default router
