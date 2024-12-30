<<<<<<< HEAD
export type UserRole = 'PENDING' | 'CHEF_MISSION' | 'DTZ' | 'DMC' | 'DGA' | 'DG' | 'BAILLEUR'
=======
export type UserRole = 'ADMIN' | 'PENDING' | 'CHEF_MISSION' | 'DTZ' | 'DMC' | 'DGA' | 'DG' | 'BAILLEUR'
>>>>>>> 6e73255 (ajout des test)
export type UserStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  mustChangePassword: boolean
  createdAt: string
  lastLogin?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  name: string
  password: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}