```vue
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        Configuration initiale
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <!-- Étapes de configuration -->
          <div v-for="step in steps" :key="step.id" class="flex items-center">
            <div :class="[
              'flex-shrink-0 h-6 w-6 rounded-full',
              step.completed ? 'bg-green-500' : 
              currentStep === step.id ? 'bg-blue-500' : 'bg-gray-200'
            ]" />
            <div class="ml-3">
              <p :class="[
                'text-sm font-medium',
                step.completed ? 'text-green-700' :
                currentStep === step.id ? 'text-blue-700' : 'text-gray-500'
              ]">
                {{ step.name }}
              </p>
            </div>
          </div>

          <NuxtLink 
            to="/setup/organization"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Commencer la configuration
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSetupStore } from '~/stores/modules/setup'

const setupStore = useSetupStore()
const { steps, currentStep } = storeToRefs(setupStore)
</script>
```