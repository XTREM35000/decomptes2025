<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <FormInput
      id="currentPassword"
      v-model="form.currentPassword"
      type="password"
      label="Mot de passe actuel"
      :error="errors.currentPassword"
      required
      :disabled="isLoading"
    />
    
    <FormInput
      id="newPassword"
      v-model="form.newPassword"
      type="password"
      label="Nouveau mot de passe"
      :error="errors.newPassword"
      required
      :disabled="isLoading"
    />
    
    <FormInput
      id="confirmPassword"
      v-model="form.confirmPassword"
      type="password"
      label="Confirmer le mot de passe"
      :error="errors.confirmPassword"
      required
      :disabled="isLoading"
    />

    <Button
      type="submit"
      variant="primary"
      :text="isLoading ? 'Modification...' : 'Modifier le mot de passe'"
      :loading="isLoading"
      :disabled="isLoading"
      class="w-full"
    />
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const api = useApi()
const router = useRouter()

const validateForm = () => {
  let isValid = true
  errors.currentPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''

  if (!form.currentPassword) {
    errors.currentPassword = 'Mot de passe actuel requis'
    isValid = false
  }

  if (!form.newPassword) {
    errors.newPassword = 'Nouveau mot de passe requis'
    isValid = false
  } else if (form.newPassword.length < 8) {
    errors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères'
    isValid = false
  }

  if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm() || isLoading.value) return

  isLoading.value = true
  try {
    await api.fetchWithAuth('/api/auth/change-password', {
      method: 'POST',
      body: {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      }
    })

    useToast().success('Mot de passe modifié avec succès')
    router.push('/')
  } catch (error: any) {
    useToast().error(error.message || 'Erreur lors de la modification du mot de passe')
  } finally {
    isLoading.value = false
  }
}
</script>