<template>
  <div class="space-y-4">
    <h3 class="font-semibold text-lg">État des signatures</h3>
    
    <div class="space-y-2">
      <div 
        v-for="signature in signatures" 
        :key="signature.userId"
        class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
      >
        <div class="flex items-center space-x-2">
          <span class="font-medium">{{ signature.role }}</span>
          <SignatureStatusBadge :status="signature.status" />
        </div>
        
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <template v-if="signature.signedAt">
            <span>Signé le {{ formatDate(signature.signedAt) }}</span>
          </template>
          <template v-if="signature.physicallySignedAt">
            <span>Signature physique le {{ formatDate(signature.physicallySignedAt) }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PhysicalSignature } from '~/types/decompte'
import { formatDate } from '~/utils/date'

defineProps<{
  signatures: PhysicalSignature[]
}>()
</script>