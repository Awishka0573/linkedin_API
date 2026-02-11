import { Router } from 'express'
import { handleAdSearch } from '../controllers/adLibrary.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

// Protected route to search Ad Library
router.get('/search', authMiddleware, handleAdSearch)

export default router
