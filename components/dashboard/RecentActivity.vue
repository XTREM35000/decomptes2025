```vue
<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h2 class="text-lg font-medium mb-4">Activité récente</h2>
    <div class="flow-root">
      <ul class="-mb-8">
        <li v-for="(activity, index) in activities" :key="activity.id">
          <div class="relative pb-8">
            <span 
              v-if="index !== activities.length - 1"
              class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" 
              aria-hidden="true"
            />
            <div class="relative flex space-x-3">
              <div>
                <span
                  :class="[
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800',
                    activityTypeClasses[activity.type]
                  ]"
                >
                  <component 
                    :is="activityTypeIcons[activity.type]"
                    class="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ activity.content }}
                    <span class="font-medium text-gray-900 dark:text-white">
                      {{ activity.target }}
                    </span>
                  </p>
                </div>
                <div class="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  <time :datetime="activity.date">{{ formatDate(activity.date) }}</time>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  DocumentCheckIcon,
  FingerPrintIcon,
  UserPlusIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'
import { formatDate } from '~/utils/date'

const activityTypeIcons = {
  VALIDATION: DocumentCheckIcon,
  SIGNATURE: FingerPrintIcon,
  USER: UserPlusIcon,
  UPDATE: PencilSquareIcon
}

const activityTypeClasses = {
  VALIDATION: 'bg-green-500',
  SIGNATURE: 'bg-blue-500',
  USER: 'bg-purple-500',
  UPDATE: 'bg-yellow-500'
}

// Simuler l'activité récente - à remplacer par des données réelles
const activities = [
  {
    id: 1,
    type: 'VALIDATION',
    content: 'Décompte validé par',
    target: 'Jean Dupont',
    date: '2024-03-20T10:30:00'
  },
  {
    id: 2,
    type: 'SIGNATURE',
    content: 'Signature électronique par',
    target: 'Marie Martin',
    date: '2024-03-20T09:15:00'
  },
  {
    id: 3,
    type: 'USER',
    content: 'Nouvel utilisateur créé :',
    target: 'Pierre Durant',
    date: '2024-03-19T16:45:00'
  },
  {
    id: 4,
    type: 'UPDATE',
    content: 'Workflow modifié par',
    target: 'Admin',
    date: '2024-03-19T14:20:00'
  }
]
</script>
```