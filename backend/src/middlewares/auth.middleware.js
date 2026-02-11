export const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies?.li_access_token

    if (!accessToken) {
        return res.status(401).json({ error: 'Not connected to LinkedIn' })
    }

    // Attach token to request for easy access in controllers
    req.accessToken = accessToken
    next()
}
