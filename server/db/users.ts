<<<<<<< HEAD
```ts
=======

>>>>>>> 6e73255 (ajout des test)
import { randomUUID } from 'crypto'

interface User {
  id: string
  email: string
  name: string
  role: string
  password: string
}

// Mock database - replace with real database in production
const users: User[] = [
  {
    id: '1',
    email: 'chef@example.com',
    name: 'Chef Mission',
    role: 'CHEF_MISSION',
    password: 'password123' // In production, use hashed passwords
  }
]

export const findUserByCredentials = (email: string, password: string) => {
  return users.find(u => u.email === email && u.password === password)
}

export const findUserById = (id: string) => {
  return users.find(u => u.id === id)
}

export const findUserByEmail = (email: string) => {
  return users.find(u => u.email === email)
}

export const createUser = async (data: { email: string; password: string; name: string }) => {
  if (findUserByEmail(data.email)) {
    throw new Error('Email already exists')
  }

  const user = {
    id: randomUUID(),
    email: data.email,
    name: data.name,
    role: 'CHEF_MISSION',
    password: data.password // In production, hash the password
  }

  users.push(user)
  return user
<<<<<<< HEAD
}
```
=======
} 
>>>>>>> 6e73255 (ajout des test)
