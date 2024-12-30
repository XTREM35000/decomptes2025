import { ref, computed } from 'vue'
import type { User } from '~/types/auth'

export const useAuthUser = () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  return {
    user,
    loading,
    isAuthenticated,
    setUser
  }
}