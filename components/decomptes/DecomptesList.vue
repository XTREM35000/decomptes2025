<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
    <DecomptesFilters v-model:filters="filters" />
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Référence
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date Création
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Étape Actuelle
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="decompte in filteredDecomptes" :key="decompte.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ decompte.reference }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <DecompteStatus :status="decompte.status" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(decompte.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ decompte.currentStep }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <DecompteActions :decompte="decompte" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/date'
import type { Decompte } from '~/types/decompte'

const props = defineProps<{
  decomptes: Decompte[]
}>()

const filters = ref({
  status: '',
  dateRange: null,
  search: ''
})

const filteredDecomptes = computed(() => {
  return props.decomptes.filter(decompte => {
    if (filters.value.status && decompte.status !== filters.value.status) return false
    if (filters.value.search && !decompte.reference.toLowerCase().includes(filters.value.search.toLowerCase())) return false
    return true
  })
})
</script>