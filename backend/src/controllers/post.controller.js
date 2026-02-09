import { createPost, fetchLinkedInUserInfo } from '../services/linkedin.service.js'

export const handleCreatePost = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.li_access_token
        const { text } = req.body

        if (!accessToken) {
            return res.status(401).json({ error: 'Not connected to LinkedIn' })
        }

        if (!text) {
            return res.status(400).json({ error: 'Post text is required' })
        }

        // First, get the user info to get the Person URN
        const userInfo = await fetchLinkedInUserInfo(accessToken)
        const personUrn = `urn:li:person:${userInfo.sub}`

        const result = await createPost(accessToken, personUrn, text)
        return res.status(201).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}
