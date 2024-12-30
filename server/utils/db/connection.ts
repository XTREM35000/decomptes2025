<<<<<<< HEAD

import mongoose from 'mongoose'
import { config } from '../../config/constants'
=======
import mongoose from 'mongoose'
import { config } from '../../config'
>>>>>>> 6e73255 (ajout des test)

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  try {
<<<<<<< HEAD
    const db = await mongoose.connect(config.db.uri, config.db.options)
    isConnected = !!db.connections[0].readyState

    console.log('MongoDB connected successfully')

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
      isConnected = false
    })

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
      isConnected = false
    })

=======
    const db = await mongoose.connect(config.mongodb.uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    isConnected = !!db.connections[0].readyState
    console.log('MongoDB connected successfully')

>>>>>>> 6e73255 (ajout des test)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
<<<<<<< HEAD
}

export const disconnectDB = async () => {
  if (!isConnected) return

  try {
    await mongoose.disconnect()
    isConnected = false
    console.log('MongoDB disconnected successfully')
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error)
    throw error
  }
}
=======
}
>>>>>>> 6e73255 (ajout des test)
