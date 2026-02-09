import { Router } from 'express'
import { linkedinAuthCallback, linkedinDisconnect, startLinkedInAuth } from '../controllers/auth.controller.js'

const router = Router()

router.get('/linkedin', startLinkedInAuth)
router.get('/linkedin/callback', linkedinAuthCallback)
router.post('/linkedin/disconnect', linkedinDisconnect)

export default router
