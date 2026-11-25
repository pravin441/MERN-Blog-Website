import { randomUUID } from 'node:crypto'

// TEMPORARY: replaced by a MongoDB User model in Module 03
const users = []

export function findUserByEmail(email) {
  return users.find((user) => user.email === email)
}

export function createUser({ name, email, password }) {
  const user = {
    id: randomUUID(),
    name,
    email,
    password, // always a bcrypt hash, never plain text
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  return user
}

// Never send the password hash to the client
export function sanitizeUser({ id, name, email, createdAt }) {
  return { id, name, email, createdAt }
}