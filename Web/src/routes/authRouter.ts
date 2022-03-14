import express from 'express'
import authController from '../controllers/authController'
import { authentificateRefreshToken } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/auth/login', authController.login)
router.post('/auth/refresh', authentificateRefreshToken, authController.refresh)

export default router
