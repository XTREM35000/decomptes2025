```vue
<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h2 class="text-lg font-medium mb-4">Actions rapides</h2>
    <div class="grid grid-cols-2 gap-4">
      <NuxtLink 
        v-for="action in actions" 
        :key="action.to"
        :to="action.to"
        class="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <component :is="action.icon" class="h-6 w-6 mb-2" />
        <span class="text-sm font-medium">{{ action.text }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  DocumentPlusIcon, 
  UserPlusIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon 
} from '@heroicons/vue/24/outline'

const actions = [
  { text: 'Nouveau décompte', to: '/decomptes/nouveau', icon: DocumentPlusIcon },
  { text: 'Signatures', to: '/signatures', icon: ClipboardDocumentCheckIcon },
  { text: 'Nouvel utilisateur', to: '/admin/users/nouveau', icon: UserPlusIcon },
  { text: 'Paramètres', to: '/admin/settings', icon: Cog6ToothIcon }
]
</script>
```