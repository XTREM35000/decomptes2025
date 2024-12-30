import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  setupCompleted: {
    type: Boolean,
    default: false
  },
  settings: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

organizationSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const Organization = mongoose.models.Organization || 
  mongoose.model('Organization', organizationSchema)