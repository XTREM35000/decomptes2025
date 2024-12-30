export interface Permission {
  name: string
  description?: string
  code: string
}

export interface Role {
  id: string
  name: string
  description?: string
  permissions: Permission[]
  isSystem: boolean
  createdAt: string
  updatedAt: string
}

export interface WorkflowStep {
  id: string
  name: string
  description?: string
  order: number
  requiredRoles: Role[]
  requiredSignatures: {
    role: Role
    type: 'ELECTRONIC' | 'PHYSICAL' | 'BOTH'
  }[]
  timeoutInHours: number
  actions: {
    name: string
    code: string
    nextStep?: string
  }[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Workflow {
  id: string
  name: string
  description?: string
  steps: WorkflowStep[]
  isDefault: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Signature {
  id: string
  userId: string
  documentId: string
  documentType: 'Decompte'
  workflowStepId: string
  type: 'ELECTRONIC' | 'PHYSICAL'
  status: 'PENDING' | 'COMPLETED' | 'REJECTED' | 'EXPIRED'
  signedAt?: string
  expiresAt?: string
  metadata?: {
    ipAddress?: string
    userAgent?: string
    location?: string
  }
  createdAt: string
}