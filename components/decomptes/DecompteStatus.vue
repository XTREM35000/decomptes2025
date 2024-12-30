<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusClasses[status]
    ]"
  >
    {{ statusLabels[status] }}
  </span>
</template>

<script setup lang="ts">
import type { DecompteStatus } from '~/types/decompte'

defineProps<{
  status: DecompteStatus
}>()

const statusLabels = {
  DRAFT: 'Brouillon',
  RECEIVED: 'Reçu',
  PENDING_DMC: 'En attente DMC',
  DMC_PROCESSING: 'En traitement DMC',
  PENDING_DGA: 'En attente DGA',
  PENDING_COURRIER: 'En attente courrier',
  COMPLETED: 'Terminé',
  REJECTED: 'Rejeté'
} as const

const statusClasses = {
  DRAFT: 'bg-gray-100 text-gray-800',
  RECEIVED: 'bg-blue-100 text-blue-800',
  PENDING_DMC: 'bg-yellow-100 text-yellow-800',
  DMC_PROCESSING: 'bg-orange-100 text-orange-800',
  PENDING_DGA: 'bg-purple-100 text-purple-800',
  PENDING_COURRIER: 'bg-indigo-100 text-indigo-800',
  COMPLETED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800'
} as const
</script>