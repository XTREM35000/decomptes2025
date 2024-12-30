<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium">Configuration du Workflow</h3>
      <Button
        variant="primary"
        text="Ajouter une étape"
        @click="addStep"
      />
    </div>

    <draggable
      v-model="steps"
      item-key="id"
      handle=".drag-handle"
      class="space-y-4"
      @end="updateStepsOrder"
    >
      <template #item="{ element: step, index }">
        <div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <div class="drag-handle cursor-move">
            <IconGripVertical class="w-5 h-5 text-gray-400" />
          </div>
          
          <div class="flex-grow">
            <input
              v-model="step.name"
              class="w-full border-gray-300 rounded-md"
              placeholder="Nom de l'étape"
            />
          </div>

          <div class="flex items-center space-x-4">
            <select
              v-model="step.role"
              class="border-gray-300 rounded-md"
            >
              <option v-for="role in availableRoles" :key="role" :value="role">
                {{ role }}
              </option>
            </select>

            <div class="flex items-center space-x-2">
              <label class="text-sm">
                <input
                  type="checkbox"
                  v-model="step.requiresElectronicSignature"
                  class="rounded border-gray-300"
                />
                Signature électronique
              </label>
              <label class="text-sm">
                <input
                  type="checkbox"
                  v-model="step.requiresPhysicalSignature"
                  class="rounded border-gray-300"
                />
                Signature physique
              </label>
            </div>

            <Button
              variant="secondary"
              text="Supprimer"
              @click="removeStep(index)"
            />
          </div>
        </div>
      </template>
    </draggable>

    <div class="flex justify-end space-x-4">
      <Button
        variant="secondary"
        text="Annuler"
        @click="$emit('cancel')"
      />
      <Button
        variant="primary"
        text="Enregistrer"
        @click="save"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable as draggable } from 'vue-draggable-next'
import { IconGripVertical } from '@heroicons/vue/24/outline'
import type { WorkflowStep } from '~/types/workflow'

const props = defineProps<{
  initialSteps?: WorkflowStep[]
}>()

const emit = defineEmits<{
  save: [steps: WorkflowStep[]]
  cancel: []
}>()

const availableRoles = [
  'CHEF_MISSION',
  'DTZ',
  'COURRIER',
  'DMC',
  'DGA'
]

const steps = ref<WorkflowStep[]>(props.initialSteps || [])

const addStep = () => {
  steps.value.push({
    id: crypto.randomUUID(),
    name: '',
    role: 'CHEF_MISSION',
    order: steps.value.length + 1,
    requiresElectronicSignature: true,
    requiresPhysicalSignature: false
  })
}

const removeStep = (index: number) => {
  steps.value.splice(index, 1)
  updateStepsOrder()
}

const updateStepsOrder = () => {
  steps.value = steps.value.map((step, index) => ({
    ...step,
    order: index + 1
  }))
}

const save = () => {
  emit('save', steps.value)
}
</script>