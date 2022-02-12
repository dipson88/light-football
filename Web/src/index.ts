import app from './app'
import db from './db'

const startApp = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv')
    dotenv.config()
  }

  const PORT = process.env.PORT

  await db.setDbConnection(process.env.MONGODB_URL)
  app.listen(PORT, () => {
    console.log(`Server is runnung on port http://localhost:${PORT}`)
  })
}

startApp()
