```typescript
import { defineStore } from 'pinia'

interface SetupState {
  isComplete: boolean
  currentStep: number
  steps: {
    id: number
    name: string
    completed: boolean
  }[]
}

export const useSetupStore = defineStore('setup', {
  state: (): SetupState => ({
    isComplete: false,
    currentStep: 1,
    steps: [
      { id: 1, name: 'Organisation', completed: false },
      { id: 2, name: 'Rôles', completed: false },
      { id: 3, name: 'Permissions', completed: false },
      { id: 4, name: 'Workflow', completed: false },
      { id: 5, name: 'Admin', completed: false }
    ]
  }),

  actions: {
    async checkSetupStatus() {
      try {
        const response = await $fetch('/api/setup/status')
        this.isComplete = response.isComplete
        return this.isComplete
      } catch {
        return false
      }
    },

    async completeStep(stepId: number) {
      const step = this.steps.find(s => s.id === stepId)
      if (step) {
        step.completed = true
        this.currentStep = stepId + 1

        await $fetch('/api/setup/step', {
          method: 'POST',
          body: { stepId, completed: true }
        })
      }
    },

    async finalizeSetup() {
      await $fetch('/api/setup/complete', { method: 'POST' })
      this.isComplete = true
    }
  }
})
```