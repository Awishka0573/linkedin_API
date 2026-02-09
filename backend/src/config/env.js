import dotenv from 'dotenv'

dotenv.config()

export const env = {
  PORT: process.env.PORT || 5000,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID || '',
  LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET || '',
  LINKEDIN_REDIRECT_URI: process.env.LINKEDIN_REDIRECT_URI || '',
  FRONTEND_DASHBOARD_URL: process.env.FRONTEND_DASHBOARD_URL || 'http://localhost:5173/dashboard',
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',
}
