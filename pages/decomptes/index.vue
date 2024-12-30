<template>
  <div class="py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Gestion des Décomptes</h1>
      <Button 
        text="Nouveau Décompte" 
        variant="primary"
        @click="navigateTo('/decomptes/nouveau')"
      />
    </div>
    
    <DecomptesList :decomptes="decomptes" />
  </div>
</template>

<script setup lang="ts">
import { useDecomptesStore } from '~/stores/decomptes'

const store = useDecomptesStore()
const decomptes = computed(() => store.all)

// Load decomptes on component mount
onMounted(() => {
  store.fetchDecomptes()
})
</script>