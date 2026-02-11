import { createLinkedInEvent, fetchLinkedInUserInfo } from '../services/linkedin.service.js'

import fs from 'fs'
import path from 'path'

export const handleCreateEvent = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.li_access_token
        const eventData = req.body

        if (!accessToken) {
            return res.status(401).json({ error: 'Not connected to LinkedIn' })
        }

        // We might need the person URN to set as the owner if not provided
        const userInfo = await fetchLinkedInUserInfo(accessToken)
        const personUrn = `urn:li:person:${userInfo.sub}`

        // Ensure owner is set
        if (!eventData.owner) {
            eventData.owner = personUrn
        }

        const result = await createLinkedInEvent(accessToken, eventData)
        return res.status(201).json({ status: 'success', data: result })
    } catch (error) {
        const errorLog = `
Timestamp: ${new Date().toISOString()}
Message: ${error.message}
Stack: ${error.stack}
Status: ${error.status}
Response Body: ${JSON.stringify(error.response || {}, null, 2)}
----------------------------------------
`
        try {
            fs.appendFileSync(path.join(process.cwd(), 'backend_errors.log'), errorLog)
        } catch (fsErr) {
            console.error('Failed to write to log file:', fsErr)
        }

        console.error('Create Event Error Detailed:', {
            message: error.message,
            stack: error.stack,
            status: error.status,
            response: error.response
        })
        next(error)
    }
}
