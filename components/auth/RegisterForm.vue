<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <FormInput
      id="name"
      v-model="form.name"
      type="text"
      label="Nom complet"
      :error="errors.name"
      required
      :disabled="isLoading"
    />
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
        to="/login"
        class="text-sm text-center text-primary-600 hover:text-primary-500"
      >
        Déjà inscrit ? Se connecter
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
  name: '',
  email: '',
  password: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: ''
})

const isLoading = ref(false)
const buttonText = computed(() => isLoading.value ? 'Inscription...' : 'S\'inscrire')

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.password = ''

  if (!form.name) {
    errors.name = 'Nom requis'
    isValid = false
  }
  if (!form.email) {
    errors.email = 'Email requis'
    isValid = false
  }
  if (!form.password || form.password.length < 6) {
    errors.password = 'Mot de passe requis (min. 6 caractères)'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm() || isLoading.value) return
  
  isLoading.value = true
  try {
    await auth.register(form)
    toast.success('Inscription réussie')
    router.push('/')
  } catch (error: any) {
    toast.error(error.message || 'Erreur d\'inscription')
  } finally {
    isLoading.value = false
  }
}
</script>