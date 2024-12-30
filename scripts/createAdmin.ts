import { config } from 'dotenv'
// import { connect } from '../server/db//*  */connection'
import { User } from '../server/models/User'
import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'

async function createAdminUser() {
  try {
    // Charger les variables d'environnement
    config()

    // Connexion à la base de données
    await mongoose.connect(process.env.MONGODB_URI!)

    const adminEmail = '2024dibo@gmail.com'
    const adminPassword = 'Admin123!' // Vous devrez changer ce mot de passe après la première connexion
    const hashedPassword = await bcryptjs.hash(adminPassword, 10)

    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    // Créer l'utilisateur admin
    const admin = await User.create({
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN', // Rôle administrateur pour la supervision et la maintenance
      status: 'ACTIVE',
      mustChangePassword: true
    })

    console.log('Admin user created successfully')
    console.log('Email:', adminEmail)
    console.log('Password:', adminPassword)
    console.log('Please change your password after first login')

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

createAdminUser()
