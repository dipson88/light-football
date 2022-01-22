import express from 'express'
import { createPost } from '../controllers/posts'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/posts/create', auth, createPost)

export default router
