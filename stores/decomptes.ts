import { defineStore } from 'pinia'
import type { Decompte } from '~/types/decompte'

export const useDecomptesStore = defineStore('decomptes', {
  state: () => ({
    decomptes: [] as Decompte[],
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    all: state => state.decomptes,
    pending: state => state.decomptes.filter(d => d.status === 'PENDING_SIGNATURE'),
    approved: state => state.decomptes.filter(d => d.status === 'APPROVED')
  },

  actions: {
    // Récupérer les décomptes
    async fetchDecomptes() {
      this.loading = true
      try {
        const response = await fetch('/api/decomptes')
        this.decomptes = await response.json()
      } catch (err) {
        this.error = 'Erreur lors du chargement des décomptes'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    // Créer et signer un décompte
    async createAndSign(data: Partial<Decompte>) {
      try {
        const response = await $fetch('/api/decomptes', {
          method: 'POST',
          body: data
        })
        this.decomptes.unshift(response)
        return response
      } catch (error: any) {
        throw new Error(error.message || 'Erreur lors de la création du décompte')
      }
    },

    // Mettre à jour un décompte
    async updateDecompte(id: string, data: Partial<Decompte>) {
      try {
        const response = await $fetch(`/api/decomptes/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.decomptes.findIndex(d => d.id === id)
        if (index !== -1) {
          this.decomptes[index] = response
        }
        return response
      } catch (error: any) {
        throw new Error(error.message || 'Erreur lors de la mise à jour du décompte')
      }
    },

    // Générer un PDF pour un décompte spécifique
    async generatePDF(id: string) {
      try {
        const response = await $fetch(`/api/decomptes/${id}/pdf`, {
          method: 'POST'
        })
        
        // Télécharger le PDF
        const blob = new Blob([response], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `decompte-${id}.pdf`
        a.click()
      } catch (error: any) {
        throw new Error(error.message || 'Erreur lors de la génération du PDF')
      }
    }
  }
})
