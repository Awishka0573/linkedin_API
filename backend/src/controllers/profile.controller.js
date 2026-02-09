import { fetchLinkedInUserInfo } from '../services/linkedin.service.js'

export const getProfile = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.li_access_token
    if (!accessToken) {
      return res.status(401).json({ error: 'Not connected to LinkedIn' })
    }

    const profile = await fetchLinkedInUserInfo(accessToken)
    return res.json({ profile })
  } catch (error) {
    return next(error)
  }
}
