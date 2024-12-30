<<<<<<< HEAD
```vue
<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">Gestion des Workflows</h1>
      </div>

      <WorkflowList
        :workflows="workflows"
        @create="showForm = true"
        @edit="editWorkflow"
        @toggle-status="toggleWorkflowStatus"
      />

      <Modal v-if="showForm" @close="closeForm">
        <WorkflowForm
          :initial-data="editingWorkflow"
          :is-loading="isLoading"
          @submit="handleSubmit"
          @cancel="closeForm"
        />
      </Modal>
    </div>
=======
<template>
  <div class="py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Gestion des Workflows</h1>
      <Button
        variant="primary"
        text="Nouveau Workflow"
        @click="showForm = true"
      />
    </div>

    <!-- Liste des workflows -->
    <div class="space-y-4">
      <div v-for="workflow in workflows" :key="workflow.id" class="bg-white rounded-lg shadow p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium">{{ workflow.name }}</h3>
            <p class="text-sm text-gray-500">{{ workflow.description }}</p>
          </div>
          <div class="flex space-x-2">
            <Button
              variant="secondary"
              text="Modifier"
              @click="editWorkflow(workflow)"
            />
            <Button
              variant="secondary"
              :text="workflow.isActive ? 'Désactiver' : 'Activer'"
              @click="toggleWorkflow(workflow)"
            />
          </div>
        </div>
        
        <WorkflowViewer
          :workflow="workflow"
          class="mt-4"
        />
      </div>
    </div>

    <!-- Modal formulaire -->
    <Modal v-if="showForm" @close="closeForm">
      <div class="p-6">
        <h2 class="text-lg font-medium mb-4">
          {{ editingWorkflow ? 'Modifier le workflow' : 'Nouveau workflow' }}
        </h2>
        
        <div class="space-y-4 mb-6">
          <FormInput
            id="name"
            v-model="form.name"
            label="Nom du workflow"
            required
          />
          
          <FormInput
            id="description"
            v-model="form.description"
            label="Description"
            type="textarea"
          />
        </div>

        <WorkflowBuilder
          :initial-steps="form.steps"
          @save="handleStepsSave"
          @cancel="closeForm"
        />
      </div>
    </Modal>
>>>>>>> 6e73255 (ajout des test)
  </div>
</template>

<script setup lang="ts">
import { useWorkflowsStore } from '~/stores/modules/workflows'
<<<<<<< HEAD

const store = useWorkflowsStore()
const workflows = computed(() => store.all)
const isLoading = ref(false)
const showForm = ref(false)
const editingWorkflow = ref(null)
=======
import type { Workflow } from '~/types/workflow'

const store = useWorkflowsStore()
const workflows = computed(() => store.workflows)
const showForm = ref(false)
const editingWorkflow = ref<Workflow | null>(null)

const form = reactive({
  name: '',
  description: '',
  steps: []
})
>>>>>>> 6e73255 (ajout des test)

onMounted(() => {
  store.fetchWorkflows()
})

<<<<<<< HEAD
const editWorkflow = (workflow) => {
  editingWorkflow.value = workflow
=======
const editWorkflow = (workflow: Workflow) => {
  editingWorkflow.value = workflow
  form.name = workflow.name
  form.description = workflow.description || ''
  form.steps = [...workflow.steps]
>>>>>>> 6e73255 (ajout des test)
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingWorkflow.value = null
<<<<<<< HEAD
}

const handleSubmit = async (data) => {
  isLoading.value = true
  try {
    if (editingWorkflow.value) {
      await store.updateWorkflow(editingWorkflow.value.id, data)
      useToast().success('Workflow mis à jour avec succès')
    } else {
      await store.createWorkflow(data)
=======
  form.name = ''
  form.description = ''
  form.steps = []
}

const handleStepsSave = async (steps: any[]) => {
  try {
    if (editingWorkflow.value) {
      await store.updateWorkflow(editingWorkflow.value.id, {
        ...form,
        steps
      })
      useToast().success('Workflow mis à jour avec succès')
    } else {
      await store.createWorkflow({
        ...form,
        steps
      })
>>>>>>> 6e73255 (ajout des test)
      useToast().success('Workflow créé avec succès')
    }
    closeForm()
  } catch (error: any) {
    useToast().error(error.message)
<<<<<<< HEAD
  } finally {
    isLoading.value = false
  }
}

const toggleWorkflowStatus = async (workflow) => {
=======
  }
}

const toggleWorkflow = async (workflow: Workflow) => {
>>>>>>> 6e73255 (ajout des test)
  try {
    await store.updateWorkflow(workflow.id, {
      isActive: !workflow.isActive
    })
    useToast().success('Statut mis à jour avec succès')
  } catch (error: any) {
    useToast().error(error.message)
  }
}
<<<<<<< HEAD
</script>
```
=======
</script>
>>>>>>> 6e73255 (ajout des test)
