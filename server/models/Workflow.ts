import mongoose from 'mongoose'

const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  steps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkflowStep'
  }],
  isDefault: {
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

workflowSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const Workflow = mongoose.models.Workflow || mongoose.model('Workflow', workflowSchema)