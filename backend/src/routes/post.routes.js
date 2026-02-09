import { Router } from 'express'
import { handleCreatePost } from '../controllers/post.controller.js'

const router = Router()

router.post('/', handleCreatePost)

export default router
