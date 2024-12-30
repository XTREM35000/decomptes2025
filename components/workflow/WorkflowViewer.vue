<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-2">
      <div 
        v-for="(step, index) in workflow.steps" 
        :key="step.id"
        class="flex items-center"
      >
        <div 
          class="flex flex-col items-center"
          :class="[
            currentStep?.id === step.id ? 'text-primary-600' : 'text-gray-500'
          ]"
        >
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="[
              currentStep?.id === step.id 
                ? 'bg-primary-100 text-primary-600' 
                : 'bg-gray-100 text-gray-500'
            ]"
          >
            {{ index + 1 }}
          </div>
          <span class="text-sm mt-1">{{ step.name }}</span>
        </div>
        
        <div 
          v-if="index < workflow.steps.length - 1"
          class="w-12 h-px bg-gray-300 mx-2"
        />
      </div>
    </div>

    <div v-if="currentStep" class="bg-white p-4 rounded-lg shadow">
      <h4 class="font-medium mb-2">Étape actuelle : {{ currentStep.name }}</h4>
      <div class="text-sm text-gray-500">
        <p>Rôle requis : {{ currentStep.role }}</p>
        <p>Signatures requises :</p>
        <ul class="list-disc list-inside">
          <li v-if="currentStep.requiresElectronicSignature">
            Signature électronique
          </li>
          <li v-if="currentStep.requiresPhysicalSignature">
            Signature physique
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Workflow, WorkflowStep } from '~/types/workflow'

const props = defineProps<{
  workflow: Workflow
  currentStepId?: string
}>()

const currentStep = computed(() => 
  props.workflow.steps.find(step => step.id === props.currentStepId)
)
</script>