<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ decompte.reference }}
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Créé le {{ formatDate(decompte.createdAt) }}
        </p>
      </div>
      <DecompteStatus :status="decompte.status" />
    </div>
    
    <div class="mt-4">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <div>
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Montant</dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-white">
            {{ formatAmount(decompte.amount) }} FCFA
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Étape actuelle</dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-white">
            {{ decompte.currentStep }}
          </dd>
        </div>
      </dl>
    </div>

    <div class="mt-6 flex justify-end space-x-4">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Decompte } from '~/types/decompte'
import { formatDate } from '~/utils/date'
import { formatAmount } from '~/utils/format'

defineProps<{
  decompte: Decompte
}>()
</script>