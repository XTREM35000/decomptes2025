<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <FormInput
      id="email"
      v-model="form.email"
      type="email"
      label="Email"
      :error="errors.email"
      required
      :disabled="isLoading"
    />
    <FormInput
      id="password"
      v-model="form.password"
      type="password"
      label="Mot de passe"
      :error="errors.password"
      required
      :disabled="isLoading"
    />
    
    <div class="flex flex-col space-y-4">
      <Button
        type="submit"
        variant="primary"
        :text="buttonText"
        :loading="isLoading"
        :disabled="isLoading"
        class="w-full"
      />
      <NuxtLink 
        to="/register"
        class="text-sm text-center text-primary-600 hover:text-primary-500"
      >
        Créer un compte
      </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/modules/auth'
import { useToast } from 'vue-toastification'

const auth = useAuthStore()
const toast = useToast()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const buttonText = computed(() => isLoading.value ? 'Connexion...' : 'Se connecter')

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email requis'
    isValid = false
  }
  if (!form.password) {
    errors.password = 'Mot de passe requis'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm() || isLoading.value) return
  
  isLoading.value = true
  try {
    await auth.login(form)
    toast.success('Connexion réussie')
    router.push('/')
  } catch (error: any) {
    toast.error(error.message || 'Erreur de connexion')
  } finally {
    isLoading.value = false
  }
}
</script>