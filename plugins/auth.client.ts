export default defineNuxtPlugin(() => {
  const authStorage = useAuthStorage()
  const token = authStorage.getToken()
  
  if (token) {
    $fetch.create({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
})