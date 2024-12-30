<template>
  <button
    :type="type"
    :class="[
      'flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' ? [
        'border-transparent text-white bg-primary-600 hover:bg-primary-700',
        'focus:ring-primary-500'
      ] : [
        'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
        'focus:ring-primary-500'
      ]
    ]"
    :disabled="disabled || loading"
  >
    <template v-if="loading">
      <svg 
        class="animate-spin -ml-1 mr-3 h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          class="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="4"
        />
        <path 
          class="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>{{ text }}</span>
    </template>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  loading?: boolean
  disabled?: boolean
}>()
</script>