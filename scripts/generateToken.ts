import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'default_fallback_secret'
const TOKEN_EXPIRATION = process.env.JWT_EXPIRES_IN || '7d'

// 📦 Payload par défaut
const payload = {
  app: 'nuxt-auth-app',
  createdAt: new Date().toISOString()
}

// 🔑 Générer un token avec le secret existant
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION })

console.log('✅ JWT Token généré :', token)
