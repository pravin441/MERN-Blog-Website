import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { login, register } from '../controllers/authController.js'
import validate from '../middleware/validate.js'
import { loginRules, registerRules } from '../validators/authValidator.js'

const router = Router()

// Stricter limit on login and register to slow down password guessing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please try again later.' },
})

router.post('/register', authLimiter, registerRules, validate, register)
router.post('/login', authLimiter, loginRules, validate, login)

export default router