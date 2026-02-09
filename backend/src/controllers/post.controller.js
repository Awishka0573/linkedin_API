import { createPost, fetchLinkedInUserInfo, registerUpload, uploadMediaBinary } from '../services/linkedin.service.js'

export const handleCreatePost = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.li_access_token
        const { text } = req.body
        const file = req.file

        if (!accessToken) {
            return res.status(401).json({ error: 'Not connected to LinkedIn' })
        }

        if (!text && !file) {
            return res.status(400).json({ error: 'Post text or media is required' })
        }

        // 1. Get user info for Person URN
        const userInfo = await fetchLinkedInUserInfo(accessToken)
        const personUrn = `urn:li:person:${userInfo.sub}`

        let mediaAsset = null
        let mediaType = 'NONE'

        // 2. Handle media if present
        if (file) {
            mediaType = file.mimetype.startsWith('image/') ? 'IMAGE' : 'VIDEO'

            // a. Register upload
            const registration = await registerUpload(accessToken, personUrn, mediaType)
            const uploadUrl = registration.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl
            mediaAsset = registration.value.asset

            // b. Upload binary
            await uploadMediaBinary(uploadUrl, accessToken, file.buffer, file.mimetype)
        }

        // 3. Create the post
        const result = await createPost(accessToken, personUrn, text, mediaAsset, mediaType)
        return res.status(201).json({ status: 'success', data: result })
    } catch (error) {
        console.error('Create Post Error:', error)
        next(error)
    }
}

