import express from 'express'
import { createPost, getPost, getAllPosts } from '../controllers/posts'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/posts/create', auth, createPost)
router.get('/posts/:id', auth, getPost)
router.get('/posts', auth, getAllPosts)

export default router
