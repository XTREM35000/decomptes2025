<template>
  <div class="py-6">
    <h1 class="text-2xl font-semibold mb-6">Gestion des Utilisateurs</h1>
    
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <select 
                v-model="user.role"
                @change="updateUserRole(user.id, $event.target.value)"
                :disabled="updating === user.id"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option v-for="role in availableRoles" :key="role" :value="role">
                  {{ role }}
                </option>
              </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              ]">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                v-if="user.status === 'PENDING'"
                @click="activateUser(user.id)"
                class="text-primary-600 hover:text-primary-900"
              >
                Activer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/modules/admin'

const admin = useAdminStore()
const users = ref([])
const updating = ref<string | null>(null)

const availableRoles = [
  'CHEF_MISSION',
  'DTZ',
  'DMC',
  'DGA',
  'DG',
  'BAILLEUR'
]

onMounted(async () => {
  await fetchUsers()
})

const fetchUsers = async () => {
  try {
    users.value = await admin.fetchUsers()
  } catch (error: any) {
    useToast().error(error.message || 'Erreur lors du chargement des utilisateurs')
  }
}

const updateUserRole = async (userId: string, role: string) => {
  updating.value = userId
  try {
    await admin.updateUserRole(userId, role)
    useToast().success('Rôle mis à jour avec succès')
  } catch (error: any) {
    useToast().error(error.message || 'Erreur lors de la mise à jour du rôle')
  } finally {
    updating.value = null
  }
}

const activateUser = async (userId: string) => {
  try {
    await admin.activateUser(userId)
    await fetchUsers()
    useToast().success('Utilisateur activé avec succès')
  } catch (error: any) {
    useToast().error(error.message || 'Erreur lors de l\'activation de l\'utilisateur')
  }
}
</script>