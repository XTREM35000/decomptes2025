import { defineStore } from 'pinia'
import type { Signature } from '~/types/signature'

export const useSignaturesStore = defineStore('signatures', () => {
  const pendingSignatures = ref<Signature[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPendingSignatures = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/signatures/pending')
      pendingSignatures.value = response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signElectronic = async (signatureId: string) => {
    try {
      await $fetch(`/api/signatures/electronic/${signatureId}`, {
        method: 'POST'
      })
      await fetchPendingSignatures()
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const signPhysical = async (signatureId: string) => {
    try {
      await $fetch(`/api/signatures/physical/${signatureId}`, {
        method: 'POST'
      })
      await fetchPendingSignatures()
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    pendingSignatures,
    loading,
    error,
    fetchPendingSignatures,
    signElectronic,
    signPhysical
  }
})