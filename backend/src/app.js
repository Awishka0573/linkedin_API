import express from 'express'
import dns from 'dns'

// DNS Monkeypatch to force IPv4 and bypass broken IPv6 environments (ConnectTimeoutError)
const originalLookup = dns.lookup
dns.lookup = (hostname, options, callback) => {
  if (typeof options === 'function') {
    callback = options
    options = { family: 4 }
  } else {
    options = { ...options, family: 4 }
  }
  return originalLookup(hostname, options, callback)
}

import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import routes from './routes/index.js'
import authRoutes from './routes/auth.routes.js'
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js'
import { env } from './config/env.js'

const app = express()

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  }),
)
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running.' })
})

app.use('/auth', authRoutes)
app.use('/api', routes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
