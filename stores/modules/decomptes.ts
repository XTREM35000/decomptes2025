import { defineStore } from 'pinia'
import type { Decompte } from '~/types/decompte'

export const useDecomptesStore = defineStore('decomptes', () => {
  const decomptes = ref<Decompte[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchDecomptes = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/decomptes')
      decomptes.value = response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createDecompte = async (data: Partial<Decompte>) => {
    try {
      const response = await $fetch('/api/decomptes', {
        method: 'POST',
        body: data
      })
      decomptes.value.unshift(response)
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const processDecompte = async (id: string, action: string) => {
    try {
      const response = await $fetch(`/api/decomptes/${id}/process`, {
        method: 'POST',
        body: { action }
      })
      const index = decomptes.value.findIndex(d => d.id === id)
      if (index !== -1) {
        decomptes.value[index] = response
      }
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    decomptes,
    loading,
    error,
    fetchDecomptes,
    createDecompte,
    processDecompte
  }
})