import express from 'express'
import { createPost, getUserPosts, getAllPosts } from '../controllers/postController'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/posts/create', auth, createPost)
router.get('/posts', auth, getUserPosts)
router.get('/posts', auth, getAllPosts)

export default router
