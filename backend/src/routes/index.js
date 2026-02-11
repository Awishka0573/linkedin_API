import { Router } from 'express'
import healthRoutes from './health.routes.js'
import profileRoutes from './profile.routes.js'
import postRoutes from './post.routes.js'
import eventRoutes from './event.routes.js'
import adLibraryRoutes from './adLibrary.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/profile', profileRoutes)
router.use('/posts', postRoutes)
router.use('/events', eventRoutes)
router.use('/adLibrary', adLibraryRoutes)

export default router
