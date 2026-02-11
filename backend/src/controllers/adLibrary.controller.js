import { searchAdLibrary } from '../services/adLibrary.service.js'

export const handleAdSearch = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.li_access_token
        const { keywords } = req.query

        if (!accessToken) {
            return res.status(401).json({ error: 'Not connected to LinkedIn' })
        }

        if (!keywords) {
            return res.status(400).json({ error: 'Keywords are required' })
        }

        const results = await searchAdLibrary(accessToken, { keywords })
        res.json({ status: 'success', data: results })
    } catch (error) {
        console.error('Ad Search Controller Error:', error)
        next(error)
    }
}
