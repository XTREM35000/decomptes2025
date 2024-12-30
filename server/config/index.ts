import { z } from 'zod'

<<<<<<< HEAD
const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
})

const env = envSchema.parse({
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV
})

export const config = {
  mongodbUri: env.MONGODB_URI,
  jwtSecret: env.JWT_SECRET,
=======
// Schéma de validation pour les variables d'environnement
const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('7d'),
  TEMP_PASSWORD_LENGTH: z.coerce.number().default(8),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
})

// Validation des variables d'environnement
const env = envSchema.parse({
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  TEMP_PASSWORD_LENGTH: process.env.TEMP_PASSWORD_LENGTH,
  NODE_ENV: process.env.NODE_ENV
})

// Configuration exportée
export const config = {
  mongodb: {
    uri: env.MONGODB_URI
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN
  },
  auth: {
    tempPasswordLength: env.TEMP_PASSWORD_LENGTH
  },
>>>>>>> 6e73255 (ajout des test)
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test'
} as const