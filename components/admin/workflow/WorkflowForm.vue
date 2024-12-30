```vue
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <FormInput
      id="name"
      v-model="form.name"
      label="Nom du workflow"
      required
      :error="errors.name"
    />
    
    <FormInput
      id="description"
      v-model="form.description"
      type="textarea"
      label="Description"
    />

    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium">Étapes</h3>
        <Button
          type="button"
          variant="secondary"
          text="Ajouter une étape"
          @click="showStepForm = true"
        />
      </div>

      <WorkflowStepsList
        :steps="form.steps"
        @edit="editStep"
        @remove="removeStep"
        @reorder="reorderSteps"
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

    <Modal v-if="showStepForm" @close="showStepForm = false">
      <WorkflowStepForm
        :initial-data="editingStep"
        @submit="handleStepSubmit"
        @cancel="showStepForm = false"
      />
    </Modal>
  </form>
</template>

<script setup lang="ts">
import type { Workflow, WorkflowStep } from '~/types/workflow'

const props = defineProps<{
  initialData?: Partial<Workflow>
  isLoading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: Partial<Workflow>]
  cancel: []
}>()

const form = reactive({
  name: props.initialData?.name || '',
  description: props.initialData?.description || '',
  steps: [...(props.initialData?.steps || [])]
})

const errors = reactive({
  name: ''
})

const showStepForm = ref(false)
const editingStep = ref<WorkflowStep | null>(null)

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

const handleStepSubmit = (stepData: Partial<WorkflowStep>) => {
  if (editingStep.value) {
    const index = form.steps.findIndex(s => s.id === editingStep.value?.id)
    if (index !== -1) {
      form.steps[index] = { ...form.steps[index], ...stepData }
    }
  } else {
    form.steps.push(stepData as WorkflowStep)
  }
  showStepForm.value = false
  editingStep.value = null
}

const editStep = (step: WorkflowStep) => {
  editingStep.value = step
  showStepForm.value = true
}

const removeStep = (stepId: string) => {
  form.steps = form.steps.filter(s => s.id !== stepId)
}

const reorderSteps = (steps: WorkflowStep[]) => {
  form.steps = steps
}

const handleSubmit = () => {
  if (!validateForm()) return
  emit('submit', { ...form })
}
</script>
```