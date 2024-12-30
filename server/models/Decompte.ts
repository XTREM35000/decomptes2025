import mongoose from 'mongoose'

const decompteSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['DRAFT', 'RECEIVED', 'PENDING_DMC', 'DMC_PROCESSING', 'PENDING_DGA', 'PENDING_COURRIER', 'COMPLETED', 'REJECTED'],
    default: 'DRAFT'
  },
  currentStep: {
    type: String,
    enum: ['COURRIER', 'DMC', 'DGA', 'CHEF_MISSION'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attachments: [{
    type: String
  }],
  bordereau: {
    generated: {
      type: Boolean,
      default: false
    },
    url: String,
    generatedAt: Date
  },
  signatures: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    signedAt: Date,
    role: String
  }],
  workflow: {
    receivedAt: Date,
    dmcStartedAt: Date,
    dmcCompletedAt: Date,
    dgaValidatedAt: Date,
    courrierSentAt: Date,
    completedAt: Date
  },
  history: [{
    action: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    details: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Middleware pour mettre à jour automatiquement les timestamps du workflow
decompteSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    const now = new Date()
    switch (this.status) {
      case 'RECEIVED':
        this.workflow.receivedAt = now
        break
      case 'DMC_PROCESSING':
        this.workflow.dmcStartedAt = now
        break
      case 'PENDING_DGA':
        this.workflow.dmcCompletedAt = now
        break
      case 'PENDING_COURRIER':
        this.workflow.dgaValidatedAt = now
        break
      case 'COMPLETED':
        this.workflow.completedAt = now
        this.workflow.courrierSentAt = now
        break
    }
  }
  next()
})

export const Decompte = mongoose.model('Decompte', decompteSchema)