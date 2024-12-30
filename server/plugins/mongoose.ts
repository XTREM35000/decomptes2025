
import { connectDB } from '../utils/db/connection'

export default defineNitroPlugin(async () => {
  try {
    await connectDB()
  } catch (error) {
    console.error('Failed to initialize MongoDB:', error)
    throw error
  }
})
