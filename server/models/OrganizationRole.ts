import mongoose from 'mongoose'

const permissionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  scope: {
    type: String,
    enum: ['GLOBAL', 'WORKFLOW', 'DOCUMENT'],
    default: 'GLOBAL'
  }
})

const organizationRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: String,
  permissions: [permissionSchema],
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  isSystem: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
})

organizationRoleSchema.index({ code: 1, organizationId: 1 }, { unique: true })

organizationRoleSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const OrganizationRole = mongoose.models.OrganizationRole || 
  mongoose.model('OrganizationRole', organizationRoleSchema)