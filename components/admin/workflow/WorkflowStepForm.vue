<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <FormInput
        id="name"
        v-model="form.name"
        label="Nom de l'étape"
        required
        :error="errors.name"
      />
      
      <FormInput
        id="order"
        v-model="form.order"
        type="number"
        label="Ordre"
        required
        :error="errors.order"
      />
    </div>

    <FormInput
      id="description"
      v-model="form.description"
      type="textarea"
      label="Description"
    />

    <div class="space-y-2">
      <h3 class="text-lg font-medium">Rôles requis</h3>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="role in availableRoles" :key="role.id" class="flex items-center">
          <input
            type="checkbox"
            :id="'role-' + role.id"
            v-model="form.requiredRoles"
            :value="role.id"
            class="rounded border-gray-300"
          />
          <label :for="'role-' + role.id" class="ml-2 text-sm">{{ role.name }}</label>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium">Signatures requises</h3>
      <div v-for="(sig, index) in form.requiredSignatures" :key="index" class="flex space-x-4">
        <select
          v-model="sig.role"
          class="rounded-md border-gray-300"
        >
          <option v-for="role in availableRoles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
        
        <select
          v-model="sig.type"
          class="rounded-md border-gray-300"
        >
          <option value="ELECTRONIC">Électronique</option>
          <option value="PHYSICAL">Physique</option>
          <option value="BOTH">Les deux</option>
        </select>
        
        <Button
          type="button"
          variant="secondary"
          text="Supprimer"
          @click="removeSignature(index)"
        />
      </div>
      
      <Button
        type="button"
        variant="secondary"
        text="Ajouter une signature"
        @click="addSignature"
      />
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
import type { Role } from '~/types/workflow'
import { useRolesStore } from '~/stores/modules/roles'

const props = defineProps<{
  initialData?: {
    name?: string
    description?: string
    order?: number
    requiredRoles?: string[]
    requiredSignatures?: Array<{
      role: string
      type: 'ELECTRONIC' | 'PHYSICAL' | 'BOTH'
    }>
  }
  isLoading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: {
    name: string
    description?: string
    order: number
    requiredRoles: string[]
    requiredSignatures: Array<{
      role: string
      type: 'ELECTRONIC' | 'PHYSICAL' | 'BOTH'
    }>
  }]
  cancel: []
}>()

const rolesStore = useRolesStore()
const availableRoles = computed(() => rolesStore.all)

const form = reactive({
  name: props.initialData?.name || '',
  description: props.initialData?.description || '',
  order: props.initialData?.order || 1,
  requiredRoles: props.initialData?.requiredRoles || [],
  requiredSignatures: props.initialData?.requiredSignatures || []
})

const errors = reactive({
  name: '',
  order: ''
})

const submitText = computed(() => props.isLoading ? 'Enregistrement...' : 'Enregistrer')

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.order = ''

  if (!form.name) {
    errors.name = 'Le nom est requis'
    isValid = false
  }

  if (!form.order || form.order < 1) {
    errors.order = 'L\'ordre doit être un nombre positif'
    isValid = false
  }

  return isValid
}

const addSignature = () => {
  form.requiredSignatures.push({
    role: '',
    type: 'ELECTRONIC'
  })
}

const removeSignature = (index: number) => {
  form.requiredSignatures.splice(index, 1)
}

const handleSubmit = () => {
  if (!validateForm()) return
  emit('submit', { ...form })
}

onMounted(() => {
  rolesStore.fetchRoles()
})
</script>