import { Router } from 'express'
import { handleCreatePost } from '../controllers/post.controller.js'
import { upload } from '../middlewares/upload.middleware.js'

const router = Router()

router.post('/', upload.single('media'), handleCreatePost)

export default router
