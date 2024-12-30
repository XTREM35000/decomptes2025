export type DecompteStatus = 
  | 'DRAFT'                    // Créé par le CM
  | 'PENDING_DTZ'             // En attente de traitement DTZ
  | 'DTZ_PROCESSING'          // En cours de traitement par DTZ
  | 'PENDING_COURRIER'        // En attente service courrier
  | 'PENDING_DMC'            // En attente traitement DMC
  | 'DMC_PROCESSING'         // En cours de traitement DMC
  | 'PENDING_DGA'            // En attente validation DGA
  | 'DGA_VALIDATED'          // Validé par DGA
  | 'PENDING_BAILLEUR'       // En attente envoi bailleur
  | 'SENT_TO_BAILLEUR'       // Envoyé au bailleur
  | 'RECEIVED_BY_BAILLEUR'   // Reçu par le bailleur
  | 'REJECTED'               // Rejeté

export type WorkflowRole = 
  | 'CHEF_MISSION'
  | 'DTZ'
  | 'COURRIER'
  | 'DMC' 
  | 'DGA'
  | 'BAILLEUR'

export interface WorkflowTimestamps {
  createdAt?: string          // Date création par CM
  dtzReceivedAt?: string     // Date réception DTZ
  sentToPostAt?: string      // Date envoi à la poste
  dgReceivedAt?: string      // Date réception DG
  dmcImputedAt?: string      // Date imputation DMC
  dgaTransmittedAt?: string  // Date transmission DGA
  sentToBailleurAt?: string  // Date envoi bailleur
  baileurReceivedAt?: string // Date réception bailleur
}

export interface Decompte {
  id: string
  reference: string
  status: DecompteStatus
  currentStep: WorkflowRole
  amount: number
  description: string
  workflow: WorkflowTimestamps
  signatures: {
    electronic: boolean
    physical: boolean
    signedAt?: string
    userId: string
    role: WorkflowRole
  }[]
  history: {
    action: string
    timestamp: string
    userId: string
    details: string
  }[]
}