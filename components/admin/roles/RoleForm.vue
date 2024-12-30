<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <FormInput
      id="name"
      v-model="form.name"
      label="Nom du rôle"
      required
      :error="errors.name"
    />
    
    <FormInput
      id="description"
      v-model="form.description"
      label="Description"
      type="textarea"
    />
    
    <div class="space-y-2">
      <h3 class="text-lg font-medium">Permissions</h3>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="perm in availablePermissions" :key="perm.code" class="flex items-center">
          <input
            type="checkbox"
            :id="perm.code"
            v-model="form.permissions"
            :value="perm"
            class="rounded border-gray-300"
          />
          <label :for="perm.code" class="ml-2 text-sm">{{ perm.name }}</label>
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-4">
      <Button
        type="button"
        variant="secondary"
        text="Annuler"
        @click="$emit('cancel')"
      />
      <Button
        type="submit"
        variant="primary"
        :text="submitText"
        :loading="isLoading"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Permission } from '~/types/workflow'
import { usePermissionsStore } from '~/stores/modules/permissions'

const props = defineProps<{
  initialData?: {
    name?: string
    description?: string
    permissions?: Permission[]
  }
  isLoading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: { name: string; description?: string; permissions: Permission[] }]
  cancel: []
}>()

const permissionsStore = usePermissionsStore()
const availablePermissions = computed(() => permissionsStore.all)

const form = reactive({
  name: props.initialData?.name || '',
  description: props.initialData?.description || '',
  permissions: props.initialData?.permissions || []
})

const errors = reactive({
  name: ''
})

const submitText = computed(() => props.isLoading ? 'Enregistrement...' : 'Enregistrer')

const validateForm = () => {
  let isValid = true
  errors.name = ''

  if (!form.name) {
    errors.name = 'Le nom est requis'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return
  emit('submit', { ...form })
}

onMounted(() => {
  permissionsStore.fetchPermissions()
})
</script>