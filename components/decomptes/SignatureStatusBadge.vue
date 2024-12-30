<template>
  <span
    :class="[
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
      statusClasses[status]
    ]"
  >
    {{ statusLabels[status] }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: 'PENDING' | 'SIGNED' | 'PHYSICALLY_SIGNED' | 'COMPLETED'
}>()

const statusLabels = {
  PENDING: 'En attente',
  SIGNED: 'Signé électroniquement',
  PHYSICALLY_SIGNED: 'Signé physiquement',
  COMPLETED: 'Complété'
}

const statusClasses = {
  PENDING: 'bg-gray-100 text-gray-800',
  SIGNED: 'bg-blue-100 text-blue-800',
  PHYSICALLY_SIGNED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-purple-100 text-purple-800'
}
</script>