import { defineStore } from 'pinia'
import type { Permission } from '~/types/workflow'

export const usePermissionsStore = defineStore('permissions', () => {
  const permissions = ref<Permission[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const all = computed(() => permissions.value)

  const fetchPermissions = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/admin/permissions')
      permissions.value = response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createPermission = async (data: Partial<Permission>) => {
    try {
      const response = await $fetch('/api/admin/permissions', {
        method: 'POST',
        body: data
      })
      permissions.value.push(response)
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    permissions,
    loading,
    error,
    all,
    fetchPermissions,
    createPermission
  }
})