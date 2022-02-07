import express from 'express'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/auth/login', authController.loginUser)

export default router
