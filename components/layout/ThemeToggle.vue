<template>
  <button
    @click="toggleColorMode"
    class="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
  >
    <span v-if="colorMode.value === 'dark'">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>