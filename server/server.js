import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'

// Refuse to start without a JWT secret
if (!process.env.JWT_SECRET) {
  console.error('Missing JWT_SECRET in server/.env')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 5000

/* ---------- Global middleware ---------- */
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 300, // max requests per IP in that window
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
)
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

/* ---------- Routes ---------- */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BlogSphere API is running',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)

/* ---------- Errors (must come last) ---------- */
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`)
})