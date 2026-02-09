import { createLinkedInEvent, fetchLinkedInUserInfo } from '../services/linkedin.service.js'

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
        console.error('Create Event Error:', error)
        next(error)
    }
}
