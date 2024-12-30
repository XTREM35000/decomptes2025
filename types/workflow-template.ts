export interface WorkflowStepTemplate {
  id: string
  name: string
  description?: string
  requiredSignatures: {
    type: 'ELECTRONIC' | 'PHYSICAL' | 'BOTH'
    order: number
  }[]
  possibleTransitions: {
    action: string
    nextStatus: string
    requiredRole: string
  }[]
  order: number
}

export interface WorkflowStatus {
  code: string
  name: string
  description?: string
}

export interface WorkflowTemplate {
  id: string
  name: string
  description?: string
  documentType: 'DECOMPTE'
  steps: WorkflowStepTemplate[]
  statuses: WorkflowStatus[]
  isActive: boolean
  organizationId: string
  createdAt: string
  updatedAt?: string
}

export interface OrganizationPermission {
  code: string
  name: string
  description?: string
  scope: 'GLOBAL' | 'WORKFLOW' | 'DOCUMENT'
}

export interface OrganizationRole {
  id: string
  name: string
  code: string
  description?: string
  permissions: OrganizationPermission[]
  organizationId: string
  isSystem: boolean
  isActive: boolean
  createdAt: string
  updatedAt?: string
}