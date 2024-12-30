<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div class="grid grid-cols-2 gap-6">
      <!-- Informations du décompte -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Informations</h3>
        <dl class="space-y-2">
          <div>
            <dt class="text-sm text-gray-500">Référence</dt>
            <dd>{{ decompte.reference }}</dd>
          </div>
          <div>
            <dt class="text-sm text-gray-500">Montant</dt>
            <dd>{{ formatAmount(decompte.amount) }} FCFA</dd>
          </div>
          <div>
            <dt class="text-sm text-gray-500">Statut</dt>
            <dd><DecompteStatus :status="decompte.status" /></dd>
          </div>
        </dl>
      </div>

      <!-- Workflow Status -->
      <WorkflowStatus 
        :workflow="decompte.workflow"
        :current-step="decompte.currentStep"
      />
    </div>

    <!-- Actions disponibles selon le rôle -->
    <div class="mt-6 flex space-x-4">
      <!-- Actions Service Courrier -->
      <template v-if="user?.role === 'COURRIER' && decompte.currentStep === 'COURRIER'">
        <Button 
          v-if="decompte.status === 'DRAFT'"
          @click="handleProcess('receive')"
          text="Réceptionner"
          variant="primary"
          :loading="processing"
        />
        <Button
          v-if="decompte.status === 'PENDING_COURRIER'"
          @click="handleProcess('send')"
          text="Envoyer"
          variant="primary"
          :loading="processing"
        />
      </template>

      <!-- Actions DMC -->
      <template v-if="user?.role === 'DMC' && decompte.currentStep === 'DMC'">
        <Button 
          v-if="decompte.status === 'PENDING_DMC'"
          @click="handleProcess('start')"
          text="Démarrer traitement"
          variant="primary"
          :loading="processing"
        />
        <Button
          v-if="decompte.status === 'DMC_PROCESSING'"
          @click="handleProcess('complete')"
          text="Terminer traitement"
          variant="primary"
          :loading="processing"
        />
      </template>

      <!-- Actions DGA -->
      <template v-if="user?.role === 'DGA' && decompte.currentStep === 'DGA'">
        <Button 
          @click="handleProcess('validate')"
          text="Valider"
          variant="primary"
          :loading="processing"
        />
        <Button
          @click="handleProcess('reject')"
          text="Rejeter"
          variant="secondary"
          :loading="processing"
        />
      </template>

      <!-- Génération bordereau -->
      <Button
        v-if="canGenerateBordereau"
        @click="handleGenerateBordereau"
        text="Générer bordereau"
        variant="secondary"
        :loading="generatingBordereau"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Decompte } from '~/types/decompte'
import { useAuth } from '~/composables/useAuth'
import { useDecomptesStore } from '~/stores/decomptes'

const props = defineProps<{
  decompte: Decompte
}>()

const { user } = useAuth()
const store = useDecomptesStore()

// États de chargement
const processing = ref(false)
const generatingBordereau = ref(false)

// Permissions
const canGenerateBordereau = computed(() => {
  return props.decompte.status === 'PENDING_COURRIER' && 
         !props.decompte.bordereau?.generated
})

// Actions
const handleProcess = async (action: string) => {
  if (processing.value) return
  processing.value = true
  
  try {
    await store.processDecompte(props.decompte.id, action)
    useToast().success('Action effectuée avec succès')
  } catch (error: any) {
    useToast().error(error.message)
  } finally {
    processing.value = false
  }
}

const handleGenerateBordereau = async () => {
  if (generatingBordereau.value) return
  generatingBordereau.value = true
  
  try {
    await store.generateBordereau(props.decompte.id)
    useToast().success('Bordereau généré avec succès')
  } catch (error: any) {
    useToast().error(error.message)
  } finally {
    generatingBordereau.value = false
  }
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount)
}
</script>