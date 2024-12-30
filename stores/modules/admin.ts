import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  const api = useApi()

  const fetchUsers = async () => {
    return await api.fetchWithAuth('/api/admin/users')
  }

  const updateUserRole = async (userId: string, role: string) => {
    return await api.fetchWithAuth(`/api/admin/users/${userId}/role`, {
      method: 'PUT',
      body: { role }
    })
  }

  const activateUser = async (userId: string) => {
    return await api.fetchWithAuth(`/api/admin/users/${userId}/activate`, {
      method: 'POST'
    })
  }

  return {
    fetchUsers,
    updateUserRole,
    activateUser
  }
})