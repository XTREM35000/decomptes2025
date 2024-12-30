<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <FormInput
      id="reference"
      v-model="form.reference"
      label="Référence"
      :error="errors.reference"
      required
      :disabled="isLoading"
    />
    
    <FormInput
      id="amount"
      v-model="form.amount"
      type="number"
      label="Montant (FCFA)"
      :error="errors.amount"
      required
      :disabled="isLoading"
    />
    
    <FormTextarea
      id="description"
      v-model="form.description"
      label="Description"
      :error="errors.description"
      required
      :disabled="isLoading"
    />

    <div class="flex justify-end space-x-4">
      <Button
        type="button"
        variant="secondary"
        text="Annuler"
        @click="$router.back()"
      />
      <Button
        type="submit"
        variant="primary"
        :text="submitText"
        :loading="isLoading"
        :disabled="isLoading"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useDecomptesStore } from '~/stores/modules/decomptes'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  initialData?: Partial<Decompte>
}>()

const store = useDecomptesStore()
const toast = useToast()
const router = useRouter()

const form = reactive({
  reference: props.initialData?.reference || '',
  amount: props.initialData?.amount || '',
  description: props.initialData?.description || ''
})

const errors = reactive({
  reference: '',
  amount: '',
  description: ''
})

const isLoading = ref(false)
const submitText = computed(() => isLoading.value ? 'Enregistrement...' : 'Enregistrer')

const validateForm = () => {
  let isValid = true
  errors.reference = ''
  errors.amount = ''
  errors.description = ''

  if (!form.reference) {
    errors.reference = 'Référence requise'
    isValid = false
  }
  if (!form.amount || form.amount <= 0) {
    errors.amount = 'Montant invalide'
    isValid = false
  }
  if (!form.description) {
    errors.description = 'Description requise'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm() || isLoading.value) return
  
  isLoading.value = true
  try {
    await store.createDecompte(form)
    toast.success('Décompte créé avec succès')
    router.push('/decomptes')
  } catch (error: any) {
    toast.error(error.message || 'Erreur lors de la création')
  } finally {
    isLoading.value = false
  }
}
</script>