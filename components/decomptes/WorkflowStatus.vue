<template>
  <div class="space-y-4">
    <h3 class="font-semibold text-lg">Progression du workflow</h3>
    
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li v-for="(step, index) in workflowSteps" :key="index" class="mb-10 ml-4">
        <div class="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5"
             :class="getStepClass(step)">
        </div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {{ formatDate(workflow[step.dateKey]) }}
        </time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ step.label }}
        </h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          {{ step.description }}
        </p>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/date'

const props = defineProps<{
  workflow: {
    receivedAt?: string
    dmcStartedAt?: string
    dmcCompletedAt?: string
    dgaValidatedAt?: string
    courrierSentAt?: string
    completedAt?: string
  }
  currentStep: string
}>()

const workflowSteps = [
  {
    label: 'Réception',
    description: 'Réceptionné par le service courrier',
    dateKey: 'receivedAt',
    role: 'COURRIER'
  },
  {
    label: 'Traitement DMC',
    description: 'En cours de traitement par la DMC',
    dateKey: 'dmcStartedAt',
    role: 'DMC'
  },
  {
    label: 'Validation DGA',
    description: 'En attente de validation par le DGA',
    dateKey: 'dgaValidatedAt',
    role: 'DGA'
  },
  {
    label: 'Envoi',
    description: 'Traité par le service courrier départ',
    dateKey: 'courrierSentAt',
    role: 'COURRIER'
  }
]

const getStepClass = (step: typeof workflowSteps[0]) => {
  if (props.workflow[step.dateKey]) {
    return 'bg-green-500'
  }
  if (props.currentStep === step.role) {
    return 'bg-blue-500 animate-pulse'
  }
  return 'bg-gray-200'
}
</script>