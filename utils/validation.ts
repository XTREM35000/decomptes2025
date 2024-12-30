export const validateReference = (ref: string): boolean => {
  // Format attendu: DECP-YYYY-XXXX
  const pattern = /^DECP-\d{4}-\d{4}$/
  return pattern.test(ref)
}

export const validateAmount = (amount: number): boolean => {
  return amount > 0 && Number.isFinite(amount)
}

export const validateEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

export const validatePassword = (password: string): boolean => {
  // Au moins 8 caractères, une majuscule, une minuscule et un chiffre
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return pattern.test(password)
}