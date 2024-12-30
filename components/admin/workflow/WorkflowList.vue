```vue
<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Workflows</h2>
      <Button
        variant="primary"
        text="Nouveau workflow"
        @click="$emit('create')"
      />
    </div>

    <div class="bg-white rounded-lg shadow divide-y">
      <div v-for="workflow in workflows" :key="workflow.id" class="p-4">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-medium">{{ workflow.name }}</h3>
            <p class="text-sm text-gray-500">{{ workflow.description }}</p>
          </div>
          <div class="flex space-x-2">
            <Button
              variant="secondary"
              text="Modifier"
              @click="$emit('edit', workflow)"
            />
            <WorkflowStatusToggle
              :workflow="workflow"
              @toggle="$emit('toggle-status', workflow)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Workflow } from '~/types/workflow'

defineProps<{
  workflows: Workflow[]
}>()

defineEmits<{
  create: []
  edit: [workflow: Workflow]
  'toggle-status': [workflow: Workflow]
}>()
</script>
```