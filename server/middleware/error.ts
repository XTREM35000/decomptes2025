import { H3Error } from 'h3'

export default defineEventHandler((event) => {
  const err = event.node.res.statusCode === 500 ? new H3Error('Internal Server Error') : null
  if (err) {
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  }
})