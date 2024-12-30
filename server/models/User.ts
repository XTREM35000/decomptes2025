<<<<<<< HEAD
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import type { UserRole, UserStatus } from '~/types/auth'

const userSchema = new mongoose.Schema({
=======
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import type { UserRole, UserStatus } from '~/types/auth'

// Interface pour les méthodes du document
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  updateLastLogin(): Promise<void>;
}

// Interface pour le modèle User
export interface IUser extends mongoose.Document, IUserMethods {
  _id: Types.ObjectId // Ajoutez cela
  email: string;
  name: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  mustChangePassword: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
>>>>>>> 6e73255 (ajout des test)
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
<<<<<<< HEAD
    enum: ['PENDING', 'CHEF_MISSION', 'DTZ', 'DMC', 'DGA', 'DG', 'BAILLEUR'],
=======
    enum: ['ADMIN', 'PENDING', 'CHEF_MISSION', 'DTZ', 'DMC', 'DGA', 'DG', 'BAILLEUR'],
>>>>>>> 6e73255 (ajout des test)
    default: 'PENDING'
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACTIVE', 'INACTIVE'],
    default: 'PENDING'
  },
  mustChangePassword: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

<<<<<<< HEAD
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
=======
userSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
>>>>>>> 6e73255 (ajout des test)
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw new Error('Error comparing passwords')
  }
}

<<<<<<< HEAD
userSchema.methods.updateLastLogin = async function(): Promise<void> {
=======
userSchema.methods.updateLastLogin = async function(this: IUser): Promise<void> {
>>>>>>> 6e73255 (ajout des test)
  this.lastLogin = new Date()
  await this.save()
}

<<<<<<< HEAD
export const User = mongoose.models.User || mongoose.model('User', userSchema)
=======
export const User = (mongoose.models.User || mongoose.model<IUser, UserModel>('User', userSchema)) as UserModel
>>>>>>> 6e73255 (ajout des test)
