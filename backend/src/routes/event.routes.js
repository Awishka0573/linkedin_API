import { Router } from 'express'
import { handleCreateEvent } from '../controllers/event.controller.js'

const router = Router()

router.post('/', handleCreateEvent)

export default router
