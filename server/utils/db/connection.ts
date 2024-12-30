
import mongoose from 'mongoose'
import { config } from '../../config/constants'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  try {
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

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
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
