import mongoose from 'mongoose'

const signatureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'documentType'
  },
  documentType: {
    type: String,
    required: true,
    enum: ['Decompte']
  },
  workflowStepId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkflowStep',
    required: true
  },
  type: {
    type: String,
    enum: ['ELECTRONIC', 'PHYSICAL'],
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'REJECTED', 'EXPIRED'],
    default: 'PENDING'
  },
  signedAt: Date,
  expiresAt: Date,
  metadata: {
    ipAddress: String,
    userAgent: String,
    location: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

signatureSchema.index({ userId: 1, documentId: 1, workflowStepId: 1, type: 1 }, { unique: true })

export const Signature = mongoose.models.Signature || mongoose.model('Signature', signatureSchema)