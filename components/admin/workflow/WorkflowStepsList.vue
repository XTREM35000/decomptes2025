```vue
<template>
  <div class="space-y-2">
    <draggable
      v-model="sortableSteps"
      item-key="id"
      handle=".drag-handle"
      @end="handleReorder"
    >
      <template #item="{ element: step }">
        <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div class="drag-handle cursor-move">
            <IconGripVertical class="w-5 h-5 text-gray-400" />
          </div>
          <div class="flex-grow">
            <h4 class="font-medium">{{ step.name }}</h4>
            <p class="text-sm text-gray-500">{{ step.description }}</p>
          </div>
          <div class="flex space-x-2">
            <Button
              variant="secondary"
              text="Modifier"
              @click="$emit('edit', step)"
            />
            <Button
              variant="secondary"
              text="Supprimer"
              @click="$emit('remove', step.id)"
            />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import type { WorkflowStep } from '~/types/workflow'
import { VueDraggable as draggable } from 'vue-draggable-next'
import { IconGripVertical } from '@heroicons/vue/24/outline'

const props = defineProps<{
  steps: WorkflowStep[]
}>()

const emit = defineEmits<{
  edit: [step: WorkflowStep]
  remove: [stepId: string]
  reorder: [steps: WorkflowStep[]]
}>()

const sortableSteps = computed({
  get: () => props.steps,
  set: (value) => emit('reorder', value)
})

const handleReorder = () => {
  emit('reorder', sortableSteps.value.map((step, index) => ({
    ...step,
    order: index + 1
  })))
}
</script>
```