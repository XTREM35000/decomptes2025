<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-full"
    >
      <span class="text-gray-700 dark:text-gray-300">{{ auth.user?.name }}</span>
      <span class="text-xs text-gray-500 dark:text-gray-400">{{ auth.user?.role }}</span>
    </button>
    
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1">
        <button
          @click="auth.logout"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const isOpen = ref(false)
</script>