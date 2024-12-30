import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://thierry_gogo:M2024Mano@cluster0.rf9zo.mongodb.net/autodecompte?retryWrites=true&w=majority'

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return
    }

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4 // Force IPv4
    })
    
    console.log('MongoDB connected successfully')

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}