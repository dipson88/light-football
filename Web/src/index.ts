import app from './app'
import db from './db'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const PORT = process.env.PORT

const startApp = async () => {
  await db.setDbConnection(process.env.MONGODB_URL)
  app.listen(PORT, () => {
    console.log(`Server is runnung on port http://localhost:${PORT}`)
  })
}

startApp()
