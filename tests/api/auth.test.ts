import { describe, test, expect, beforeEach } from 'vitest'
import { createServer } from '../../server/api/auth'
import { User } from '../../server/models/User'

describe('Auth API', () => {
  beforeEach(async () => {
    // Clean up database before each test
    await User.deleteMany({})
  })

  describe('POST /api/auth/register', () => {
    test('should register a new user successfully', async () => {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'Password123!',
          name: 'Test User'
        }
      })

      expect(response.user).toBeDefined()
      expect(response.token).toBeDefined()
      expect(response.user.email).toBe('test@example.com')
    })

    test('should fail with existing email', async () => {
      await User.create({
        email: 'test@example.com',
        password: 'Password123!',
        name: 'Test User'
      })

      await expect($fetch('/api/auth/register', {
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'Password123!',
          name: 'Test User'
        }
      })).rejects.toThrow()
    })
  })

  describe('POST /api/auth/login', () => {
    test('should login successfully with correct credentials', async () => {
      await User.create({
        email: 'test@example.com',
        password: 'Password123!',
        name: 'Test User'
      })

      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'Password123!'
        }
      })

      expect(response.token).toBeDefined()
      expect(response.user).toBeDefined()
    })

    test('should fail with incorrect password', async () => {
      await User.create({
        email: 'test@example.com',
        password: 'Password123!',
        name: 'Test User'
      })

      await expect($fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'WrongPassword'
        }
      })).rejects.toThrow()
    })
  })
})