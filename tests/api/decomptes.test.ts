import { describe, test, expect, beforeEach } from 'vitest'
import { Decompte } from '../../server/models/Decompte'
import { User } from '../../server/models/User'

describe('Decomptes API', () => {
  let authToken: string
  let userId: string

  beforeEach(async () => {
    await Decompte.deleteMany({})
    await User.deleteMany({})

    // Create test user and get auth token
    const user = await User.create({
      email: 'test@example.com',
      password: 'Password123!',
      name: 'Test User',
      role: 'CHEF_MISSION'
    })
    userId = user._id.toString()

    const loginResponse = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'Password123!'
      }
    })
    authToken = loginResponse.token
  })

  describe('POST /api/decomptes', () => {
    test('should create a new decompte', async () => {
      const response = await $fetch('/api/decomptes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: {
          reference: 'DECP-2024-0001',
          amount: 1000000,
          description: 'Test decompte'
        }
      })

      expect(response.id).toBeDefined()
      expect(response.status).toBe('DRAFT')
      expect(response.currentStep).toBe('CHEF_MISSION')
    })
  })

  describe('GET /api/decomptes', () => {
    test('should return list of decomptes', async () => {
      // Create test decompte
      await Decompte.create({
        reference: 'DECP-2024-0001',
        amount: 1000000,
        description: 'Test decompte',
        status: 'DRAFT',
        currentStep: 'CHEF_MISSION'
      })

      const response = await $fetch('/api/decomptes', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      expect(Array.isArray(response)).toBe(true)
      expect(response.length).toBeGreaterThan(0)
    })
  })

  describe('POST /api/decomptes/:id/process', () => {
    test('should process decompte action', async () => {
      const decompte = await Decompte.create({
        reference: 'DECP-2024-0001',
        amount: 1000000,
        description: 'Test decompte',
        status: 'DRAFT',
        currentStep: 'CHEF_MISSION'
      })

      const response = await $fetch(`/api/decomptes/${decompte._id}/process`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: {
          action: 'validate'
        }
      })

      expect(response.status).toBe('PENDING_DTZ')
      expect(response.currentStep).toBe('DTZ')
    })
  })
})