import mongoose from 'mongoose'

const workflowStepTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  requiredSignatures: [{
    type: {
      type: String,
      enum: ['ELECTRONIC', 'PHYSICAL', 'BOTH'],
      default: 'ELECTRONIC'
    },
    order: Number
  }],
  possibleTransitions: [{
    action: String,
    nextStatus: String,
    requiredRole: String
  }],
  order: {
    type: Number,
    required: true
  }
})

const workflowTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  documentType: {
    type: String,
    required: true,
    enum: ['DECOMPTE'] // Extensible pour d'autres types de documents
  },
  steps: [workflowStepTemplateSchema],
  statuses: [{
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
})

workflowTemplateSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const WorkflowTemplate = mongoose.models.WorkflowTemplate || 
  mongoose.model('WorkflowTemplate', workflowTemplateSchema)