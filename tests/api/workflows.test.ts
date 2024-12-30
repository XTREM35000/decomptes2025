import { describe, test, expect, beforeEach } from 'vitest'
import { Workflow } from '../../server/models/Workflow'
import { User } from '../../server/models/User'

describe('Workflows API', () => {
  let authToken: string
  let adminToken: string

  beforeEach(async () => {
    await Workflow.deleteMany({})
    await User.deleteMany({})

    // Create admin user
    const admin = await User.create({
      email: 'admin@example.com',
      password: 'Password123!',
      name: 'Admin User',
      role: 'DGA'
    })

    // Get admin token
    const adminLogin = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: 'admin@example.com',
        password: 'Password123!'
      }
    })
    adminToken = adminLogin.token

    // Create regular user
    const user = await User.create({
      email: 'user@example.com',
      password: 'Password123!',
      name: 'Regular User',
      role: 'CHEF_MISSION'
    })

    // Get user token
    const userLogin = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: 'user@example.com',
        password: 'Password123!'
      }
    })
    authToken = userLogin.token
  })

  describe('GET /api/workflows', () => {
    test('should return list of workflows', async () => {
      await Workflow.create({
        name: 'Test Workflow',
        steps: [],
        isActive: true
      })

      const response = await $fetch('/api/workflows', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      expect(Array.isArray(response)).toBe(true)
      expect(response.length).toBeGreaterThan(0)
    })
  })

  describe('POST /api/workflows', () => {
    test('should create workflow when admin', async () => {
      const response = await $fetch('/api/workflows', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: {
          name: 'New Workflow',
          description: 'Test workflow',
          steps: [
            {
              name: 'Step 1',
              role: 'CHEF_MISSION',
              order: 1
            }
          ]
        }
      })

      expect(response.id).toBeDefined()
      expect(response.name).toBe('New Workflow')
    })

    test('should fail when not admin', async () => {
      await expect($fetch('/api/workflows', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: {
          name: 'New Workflow'
        }
      })).rejects.toThrow()
    })
  })

  describe('PUT /api/workflows/:id', () => {
    test('should update workflow when admin', async () => {
      const workflow = await Workflow.create({
        name: 'Test Workflow',
        steps: [],
        isActive: true
      })

      const response = await $fetch(`/api/workflows/${workflow._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: {
          name: 'Updated Workflow'
        }
      })

      expect(response.name).toBe('Updated Workflow')
    })
  })

  describe('DELETE /api/workflows/:id', () => {
    test('should delete workflow when admin', async () => {
      const workflow = await Workflow.create({
        name: 'Test Workflow',
        steps: [],
        isActive: true
      })

      await $fetch(`/api/workflows/${workflow._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })

      const found = await Workflow.findById(workflow._id)
      expect(found).toBeNull()
    })
  })
})