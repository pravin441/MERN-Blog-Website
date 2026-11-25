import bcrypt from 'bcryptjs'
import AppError from '../utils/AppError.js'
import generateToken from '../utils/generateToken.js'
import { createUser, findUserByEmail, sanitizeUser } from '../services/userStore.js'

// POST /api/auth/register
export async function register(req, res) {
  const { name, email, password } = req.body

  if (findUserByEmail(email)) {
    throw new AppError('An account with this email already exists', 409)
  }

  // 10 salt rounds: strong enough, and fast enough for a web request
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = createUser({ name, email, password: hashedPassword })

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token: generateToken(user.id),
    user: sanitizeUser(user),
  })
}

// POST /api/auth/login
export async function login(req, res) {
  const { email, password } = req.body

  const user = findUserByEmail(email)
  const passwordMatches = user && (await bcrypt.compare(password, user.password))

  // Same message for "no such email" and "wrong password", so attackers can't discover which emails exist
  if (!passwordMatches) {
    throw new AppError('Invalid email or password', 401)
  }

  res.json({
    success: true,
    message: 'Logged in successfully',
    token: generateToken(user.id),
    user: sanitizeUser(user),
  })
}