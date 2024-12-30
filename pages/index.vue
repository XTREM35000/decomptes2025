```vue
<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold mb-6">Tableau de bord</h1>
      
      <!-- Contenu du tableau de bord -->
      <div v-if="isAdmin" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-yellow-700">
          Configuration système requise. 
          <NuxtLink to="/setup" class="font-medium underline">
            Commencer la configuration
          </NuxtLink>
        </p>
      </div>

      <!-- Reste du contenu -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/modules/auth'
import { useSetupStore } from '~/stores/modules/setup'

const authStore = useAuthStore()
const setupStore = useSetupStore()

const isAdmin = computed(() => authStore.user?.role === 'ADMIN')
</script>
```