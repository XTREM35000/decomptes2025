```vue
<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h2 class="text-lg font-medium mb-4">Tâches en attente</h2>
    <div class="space-y-4">
      <div 
        v-for="task in tasks" 
        :key="task.id"
        class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
      >
        <div class="flex items-center space-x-3">
          <component :is="task.icon" class="h-5 w-5 text-gray-400" />
          <span>{{ task.text }}</span>
        </div>
        <NuxtLink 
          :to="task.to"
          class="text-primary-600 hover:text-primary-500 text-sm font-medium"
        >
          Voir
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  DocumentCheckIcon,
  FingerPrintIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

// Simuler les tâches - à remplacer par des données réelles
const tasks = [
  {
    id: 1,
    text: '3 décomptes à valider',
    to: '/decomptes?filter=pending',
    icon: DocumentCheckIcon
  },
  {
    id: 2,
    text: '2 signatures en attente',
    to: '/signatures?filter=pending',
    icon: FingerPrintIcon
  },
  {
    id: 3,
    text: '5 utilisateurs à approuver',
    to: '/admin/users?filter=pending',
    icon: UserGroupIcon
  }
]
</script>
```