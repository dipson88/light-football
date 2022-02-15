import express from 'express'
import postController from '../controllers/postController'
import { authentificateUser } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/posts/create', authentificateUser, postController.createPost)
router.get('/posts', authentificateUser, postController.getUserPosts)
router.get('/posts/all', authentificateUser, postController.getAllPosts)
router.get('/posts/post-by-match', authentificateUser, postController.getPostsByMatchId)

export default router
