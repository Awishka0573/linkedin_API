import crypto from 'crypto'
import { env } from '../config/env.js'
import { createLinkedInAuthUrl, exchangeCodeForToken, fetchLinkedInUserInfo } from '../services/linkedin.service.js'

const ensureLinkedInConfig = () => {
  if (!env.LINKEDIN_CLIENT_ID || !env.LINKEDIN_CLIENT_SECRET || !env.LINKEDIN_REDIRECT_URI) {
    const error = new Error('LinkedIn OIDC config is missing')
    error.status = 500
    throw error
  }
}

export const startLinkedInAuth = (req, res, next) => {
  try {
    ensureLinkedInConfig()
    const state = crypto.randomBytes(16).toString('hex')
    res.cookie('li_oauth_state', state, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.COOKIE_SECURE,
    })
    const authUrl = createLinkedInAuthUrl(state)
    res.redirect(authUrl)
  } catch (error) {
    next(error)
  }
}

export const linkedinAuthCallback = async (req, res, next) => {
  try {
    ensureLinkedInConfig()
    const { code, state, error, error_description: errorDescription } = req.query

    if (error) {
      return res.status(400).json({ error, errorDescription })
    }

    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' })
    }

    const storedState = req.cookies?.li_oauth_state
    if (!state || !storedState || state !== storedState) {
      return res.status(400).json({ error: 'Invalid state' })
    }

    const tokenData = await exchangeCodeForToken(code)
    await fetchLinkedInUserInfo(tokenData.access_token)

    res.clearCookie('li_oauth_state')
    res.cookie('li_access_token', tokenData.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.COOKIE_SECURE,
      maxAge: (tokenData.expires_in || 3600) * 1000,
    })
    const redirectUrl = new URL(env.FRONTEND_DASHBOARD_URL)
    redirectUrl.searchParams.set('auth', 'success')
    return res.redirect(redirectUrl.toString())
  } catch (error) {
    return next(error)
  }
}

export const linkedinDisconnect = (req, res) => {
  res.clearCookie('li_access_token')
  return res.json({ status: 'disconnected' })
}
