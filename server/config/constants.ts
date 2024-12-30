export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
  expiresIn: '24h'
} as const

export const DB_CONFIG = {
  uri: process.env.MONGODB_URI || 'mongodb+srv://thierry_gogo:M2024Mano@cluster0.rf9zo.mongodb.net/autodecompte?retryWrites=true&w=majority',
  options: {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4
  }
} as const

export const config = {
  jwt: JWT_CONFIG,
  db: DB_CONFIG
} as const