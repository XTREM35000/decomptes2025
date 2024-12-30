export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR').format(amount)
}

export const formatReference = (ref: string): string => {
  return ref.toUpperCase().trim()
}

export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    DRAFT: 'Brouillon',
    PENDING_DTZ: 'En attente DTZ',
    DTZ_PROCESSING: 'En traitement DTZ',
    PENDING_COURRIER: 'En attente courrier',
    PENDING_DMC: 'En attente DMC',
    DMC_PROCESSING: 'En traitement DMC',
    PENDING_DGA: 'En attente DGA',
    DGA_VALIDATED: 'Validé par DGA',
    PENDING_BAILLEUR: 'En attente bailleur',
    SENT_TO_BAILLEUR: 'Envoyé au bailleur',
    RECEIVED_BY_BAILLEUR: 'Reçu par le bailleur',
    REJECTED: 'Rejeté'
  }
  
  return statusMap[status] || status
}