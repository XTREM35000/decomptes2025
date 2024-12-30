<!-- pages/decomptes/nouveau.vue -->
<template>
  <div class="py-6">
    <h1 class="text-2xl font-semibold mb-6">Nouveau Décompte</h1>
    
    <form @submit.prevent="handleSubmit" class="max-w-2xl bg-white p-6 rounded-lg shadow">
      <div class="space-y-4">
        <FormInput
          id="reference"
          v-model="form.reference"
          label="Référence du décompte"
          required
        />
        
        <FormInput
          id="amount"
          v-model="form.amount"
          type="number"
          label="Montant (FCFA)"
          required
        />
        
        <FormInput
          id="description"
          v-model="form.description"
          type="textarea"
          label="Description détaillée"
          required
        />

        <div class="mt-6 flex space-x-4">
          <Button
            type="submit"
            text="Créer et Signer"
            variant="primary"
            :loading="isSubmitting"
          />
          <Button
            type="button"
            text="Annuler"
            variant="secondary"
            @click="router.back()"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { user } = useAuth()
const store = useDecomptesStore()

const form = reactive({
  reference: '',
  amount: '',
  description: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (isSubmitting.value) return
  
  try {
    isSubmitting.value = true
    
    await store.createAndSign({
      ...form,
      amount: Number(form.amount)
    })
    
    // Notification de succès
    useToast().success('Décompte créé et signé avec succès')
    router.push('/decomptes')
    
  } catch (error: any) {
    useToast().error(error.message || 'Erreur lors de la création du décompte')
  } finally {
    isSubmitting.value = false
  }
}
</script>
