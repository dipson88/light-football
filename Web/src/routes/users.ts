import express from 'express'
import { createUser, loginUser } from '../controllers/users'

const router = express.Router()

router.post('/users/create', createUser)
router.post('/users/login', loginUser)

export default router
