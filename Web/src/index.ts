import app from './app'
import dotenv from 'dotenv'
import db from './db'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const PORT = process.env.PORT

const startApp = async () => {
  await db.setDbConnection(process.env.MONGODB_URL)
  app.listen(PORT, () => {
    console.log(`Server is runnung on port ${PORT}`)
  })
}

startApp()
