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
  </div>
</template>

<script setup lang="ts">
import { useWorkflowsStore } from '~/stores/modules/workflows'

const store = useWorkflowsStore()
const workflows = computed(() => store.all)
const isLoading = ref(false)
const showForm = ref(false)
const editingWorkflow = ref(null)

onMounted(() => {
  store.fetchWorkflows()
})

const editWorkflow = (workflow) => {
  editingWorkflow.value = workflow
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingWorkflow.value = null
}

const handleSubmit = async (data) => {
  isLoading.value = true
  try {
    if (editingWorkflow.value) {
      await store.updateWorkflow(editingWorkflow.value.id, data)
      useToast().success('Workflow mis à jour avec succès')
    } else {
      await store.createWorkflow(data)
      useToast().success('Workflow créé avec succès')
    }
    closeForm()
  } catch (error: any) {
    useToast().error(error.message)
  } finally {
    isLoading.value = false
  }
}

const toggleWorkflowStatus = async (workflow) => {
  try {
    await store.updateWorkflow(workflow.id, {
      isActive: !workflow.isActive
    })
    useToast().success('Statut mis à jour avec succès')
  } catch (error: any) {
    useToast().error(error.message)
  }
}
</script>
```