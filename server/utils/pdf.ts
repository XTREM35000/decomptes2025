import type { Decompte } from '~/types/decompte'

export const generateBordereau = async (decompte: Decompte): Promise<Buffer> => {
  // Simulation de génération de PDF pour le moment
  // Dans une vraie implémentation, utilisez une bibliothèque comme PDFKit
  const content = `
    Bordereau de transmission
    Référence: ${decompte.reference}
    Date: ${new Date().toLocaleDateString()}
  `
  
  return Buffer.from(content)
}

export const generateBaileurBordereau = async (decompte: Decompte): Promise<Buffer> => {
  // Simulation de génération de PDF pour le moment
  const content = `
    Bordereau de transmission au bailleur
    Référence: ${decompte.reference}
    Date: ${new Date().toLocaleDateString()}
    Signatures complètes: ${decompte.physicalSignatures.length}
  `
  
  return Buffer.from(content)
}