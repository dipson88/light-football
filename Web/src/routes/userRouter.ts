import express from 'express'
import userController from '../controllers/userController'
import { authentificateUser } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/users/create', userController.createUser)
router.get('/users/info', authentificateUser, userController.getUserInfo)

export default router
