import { defineStore } from 'pinia'
import type { Workflow } from '~/types/workflow'

export const useWorkflowsStore = defineStore('workflows', () => {
  const workflows = ref<Workflow[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchWorkflows = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/workflows')
      workflows.value = response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createWorkflow = async (data: Partial<Workflow>) => {
    try {
      const response = await $fetch('/api/workflows', {
        method: 'POST',
        body: data
      })
      workflows.value.unshift(response)
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updateWorkflow = async (id: string, data: Partial<Workflow>) => {
    try {
      const response = await $fetch(`/api/workflows/${id}`, {
        method: 'PUT',
        body: data
      })
      const index = workflows.value.findIndex(w => w.id === id)
      if (index !== -1) {
        workflows.value[index] = response
      }
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const deleteWorkflow = async (id: string) => {
    try {
      await $fetch(`/api/workflows/${id}`, {
        method: 'DELETE'
      })
      workflows.value = workflows.value.filter(w => w.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    workflows,
    loading,
    error,
    fetchWorkflows,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow
  }
})