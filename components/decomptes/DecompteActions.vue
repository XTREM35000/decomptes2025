<template>
  <div class="flex space-x-4">
    <Button
      v-if="canProcess"
      variant="primary"
      :text="processButtonText"
      :loading="isProcessing"
      @click="handleProcess"
    />
    
    <Button
      v-if="canGenerateBordereau"
      variant="secondary"
      text="Générer bordereau"
      :loading="isGenerating"
      @click="handleGenerateBordereau"
    />
  </div>
</template>

<script setup lang="ts">
import type { Decompte } from '~/types/decompte'
import { useDecomptesStore } from '~/stores/modules/decomptes'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '~/stores/modules/auth'
<<<<<<< HEAD
=======
import { ref } from 'vue';
>>>>>>> 6e73255 (ajout des test)

const props = defineProps<{
  decompte: Decompte
}>()

const store = useDecomptesStore()
const auth = useAuthStore()
const toast = useToast()

const isProcessing = ref(false)
const isGenerating = ref(false)

const canProcess = computed(() => {
  return props.decompte.currentStep === auth.user?.role
})

const canGenerateBordereau = computed(() => {
  return auth.user?.role === 'COURRIER' && 
         props.decompte.status === 'PENDING_COURRIER'
})

const processButtonText = computed(() => {
  switch (auth.user?.role) {
    case 'COURRIER': return 'Réceptionner'
    case 'DMC': return 'Traiter'
    case 'DGA': return 'Valider'
    default: return 'Traiter'
  }
})

const handleProcess = async () => {
  if (isProcessing.value) return
  
  isProcessing.value = true
  try {
    await store.processDecompte(props.decompte.id, 'process')
    toast.success('Action effectuée avec succès')
  } catch (error: any) {
    toast.error(error.message || 'Erreur lors du traitement')
  } finally {
    isProcessing.value = false
  }
}

const handleGenerateBordereau = async () => {
  if (isGenerating.value) return
  
  isGenerating.value = true
  try {
    const response = await $fetch(`/api/decomptes/${props.decompte.id}/bordereau`, {
      method: 'POST'
    })
    
    // Télécharger le PDF
    const blob = new Blob([response], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bordereau-${props.decompte.reference}.pdf`
    a.click()
    
    toast.success('Bordereau généré avec succès')
  } catch (error: any) {
    toast.error(error.message || 'Erreur lors de la génération')
  } finally {
    isGenerating.value = false
  }
}
</script>