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
<<<<<<< HEAD
        :text="buttonText"
        :loading="isLoading"
        :disabled="isLoading"
        class="w-full"
      />
=======
        :loading="isLoading"
        :disabled="isLoading"
        class="w-full"
      >
        {{ buttonText }}
      </Button>
>>>>>>> 6e73255 (ajout des test)
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
<<<<<<< HEAD
import { useAuthStore } from '~/stores/modules/auth'
import { useToast } from 'vue-toastification'

const auth = useAuthStore()
const toast = useToast()
const router = useRouter()
=======
import { useAuth } from '~/composables/useAuth'
import { useToast } from 'vue-toastification'

const { login } = useAuth()
const toast = useToast()
>>>>>>> 6e73255 (ajout des test)

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
<<<<<<< HEAD
    await auth.login(form)
    toast.success('Connexion réussie')
    router.push('/')
=======
    await login(form)
    toast.success('Connexion réussie')
    useRouter().push('/')
>>>>>>> 6e73255 (ajout des test)
  } catch (error: any) {
    toast.error(error.message || 'Erreur de connexion')
  } finally {
    isLoading.value = false
  }
}
</script>