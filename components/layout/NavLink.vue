<template>
  <NuxtLink
    :to="to"
    :class="[
      'inline-flex items-center px-1 pt-1 text-sm font-medium',
      'border-b-2 transition-colors duration-200',
      $route.path === to
        ? 'border-primary-500 text-gray-900 dark:text-white'
        : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
    ]"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>