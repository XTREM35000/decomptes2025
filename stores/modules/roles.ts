import { defineStore } from 'pinia'
import type { Role } from '~/types/workflow'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref<Role[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const all = computed(() => roles.value)
  const systemRoles = computed(() => roles.value.filter(r => r.isSystem))
  const customRoles = computed(() => roles.value.filter(r => !r.isSystem))

  const fetchRoles = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/admin/roles')
      roles.value = response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createRole = async (data: Partial<Role>) => {
    try {
      const response = await $fetch('/api/admin/roles', {
        method: 'POST',
        body: data
      })
      roles.value.push(response)
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updateRole = async (id: string, data: Partial<Role>) => {
    try {
      const response = await $fetch(`/api/admin/roles/${id}`, {
        method: 'PUT',
        body: data
      })
      const index = roles.value.findIndex(r => r.id === id)
      if (index !== -1) {
        roles.value[index] = response
      }
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    roles,
    loading,
    error,
    all,
    systemRoles,
    customRoles,
    fetchRoles,
    createRole,
    updateRole
  }
})