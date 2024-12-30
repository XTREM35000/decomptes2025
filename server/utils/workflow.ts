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

export const canGenerateBordereau = (decompte: Decompte): boolean => {
  // Vérifier si toutes les signatures requises sont présentes
  const requiredSignatures = ['CHEF_MISSION', 'DTZ', 'DMC', 'DGA']
  return requiredSignatures.every(role => 
    decompte.signatures.some(s => 
      s.role === role && s.electronic && s.physical
    )
  )
}

export const validateWorkflowTransition = (
  decompte: Decompte,
  fromRole: WorkflowRole,
  toRole: WorkflowRole
): boolean => {
  const fromIndex = WORKFLOW_STEPS.indexOf(fromRole)
  const toIndex = WORKFLOW_STEPS.indexOf(toRole)
  
  // Vérifier que la transition suit l'ordre du workflow
  return fromIndex >= 0 && toIndex >= 0 && toIndex > fromIndex
}