import type { Decompte, WorkflowRole } from '~/types/decompte'

export const WORKFLOW_STEPS: WorkflowRole[] = [
  'CHEF_MISSION',
  'DTZ',
  'COURRIER',
  'DMC',
  'DGA',
  'BAILLEUR'
]

export const getNextStep = (currentStep: WorkflowRole): WorkflowRole | null => {
  const currentIndex = WORKFLOW_STEPS.indexOf(currentStep)
  if (currentIndex === -1 || currentIndex === WORKFLOW_STEPS.length - 1) {
    return null
  }
  return WORKFLOW_STEPS[currentIndex + 1]
}

export const canProcessDecompte = (decompte: Decompte, userRole: WorkflowRole): boolean => {
  return decompte.currentStep === userRole
}

export const canGenerateBordereau = (decompte: Decompte): boolean => {
  return decompte.status === 'PENDING_COURRIER' && 
         !decompte.bordereau?.generated
}

export const getRequiredSignatures = (decompte: Decompte): WorkflowRole[] => {
  const currentIndex = WORKFLOW_STEPS.indexOf(decompte.currentStep)
  return WORKFLOW_STEPS.slice(0, currentIndex + 1)
}