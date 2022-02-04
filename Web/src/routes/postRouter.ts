import express from 'express'
import { createPost, getUserPosts, getAllPosts } from '../controllers/postController'
import { authentificateUser } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/posts/create', authentificateUser, createPost)
router.get('/posts', authentificateUser, getUserPosts)
router.get('/posts', authentificateUser, getAllPosts)

export default router
