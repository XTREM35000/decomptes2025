import mongoose from 'mongoose'

const workflowStepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  order: {
    type: Number,
    required: true
  },
  requiredRoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }],
  requiredSignatures: [{
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    },
    type: {
      type: String,
      enum: ['ELECTRONIC', 'PHYSICAL', 'BOTH'],
      default: 'ELECTRONIC'
    }
  }],
  timeoutInHours: {
    type: Number,
    default: 48
  },
  actions: [{
    name: String,
    code: String,
    nextStep: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkflowStep'
    }
  }],
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

workflowStepSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const WorkflowStep = mongoose.models.WorkflowStep || mongoose.model('WorkflowStep', workflowStepSchema)