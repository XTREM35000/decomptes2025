import mongoose from 'mongoose'

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  code: {
    type: String,
    required: true,
    unique: true
  }
})

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  permissions: [permissionSchema],
  isSystem: {
    type: Boolean,
    default: false
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

roleSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const Role = mongoose.models.Role || mongoose.model('Role', roleSchema)