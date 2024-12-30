import { connectDB } from '~/server/utils/db'

export default defineNuxtPlugin(async () => {
  if (process.server) {
    await connectDB()
  }
})