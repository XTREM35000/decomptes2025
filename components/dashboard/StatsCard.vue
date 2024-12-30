```vue
<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <component 
            :is="icon" 
            class="h-6 w-6 text-gray-400 dark:text-gray-500" 
            aria-hidden="true"
          />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {{ title }}
            </dt>
            <dd class="flex items-baseline">
              <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ value }}{{ suffix ? ` ${suffix}` : '' }}
              </div>
              <div 
                v-if="change"
                :class="[
                  'ml-2 flex items-baseline text-sm font-semibold',
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                ]"
              >
                <component 
                  :is="trend === 'up' ? 'ArrowUpIcon' : 'ArrowDownIcon'"
                  class="h-4 w-4 flex-shrink-0 self-center"
                  aria-hidden="true"
                />
                <span class="ml-1">{{ change }}%</span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'

defineProps<{
  title: string
  value: string | number
  suffix?: string
  trend?: 'up' | 'down'
  change?: number
  icon: any
}>()
</script>
```