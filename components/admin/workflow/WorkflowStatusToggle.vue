```vue
<template>
  <button
    type="button"
    :class="[
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      workflow.isActive ? 'bg-primary-600' : 'bg-gray-200'
    ]"
    @click="$emit('toggle')"
  >
    <span
      :class="[
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        workflow.isActive ? 'translate-x-5' : 'translate-x-0'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
import type { Workflow } from '~/types/workflow'

defineProps<{
  workflow: Workflow
}>()

defineEmits<{
  toggle: []
}>()
</script>
```