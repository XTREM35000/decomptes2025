import type { Decompte, PhysicalSignature } from '~/types/decompte'

export const checkAllSignaturesComplete = (decompte: Decompte): boolean => {
  const requiredSignatures = ['CHEF_MISSION', 'DMC', 'DGA']
  
  return requiredSignatures.every(role => {
    const signature = decompte.physicalSignatures.find(s => s.role === role)
    return signature?.status === 'COMPLETED'
  })
}

export const canGenerateBaileurBordereau = (decompte: Decompte): boolean => {
  return checkAllSignaturesComplete(decompte) && 
         decompte.status === 'PENDING_BAILLEUR'
}