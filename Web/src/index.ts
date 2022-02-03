import app from './app'
import dotenv from 'dotenv'
// import db from './db'
import { testCreate, testDb } from './entities/userT'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const PORT = process.env.PORT

// const startApp = async () => {
//   await db.setDbConnection(process.env.MONGODB_URL)
//   app.listen(PORT, () => {
//     console.log(`Server is runnung on port ${PORT}`)
//   })
// }

// startApp()

const startTestApp = async () => {
  await testDb()
  await testCreate()
  app.listen(PORT, () => {
    console.log(`Server is runnung on port ${PORT}`)
  })
}

startTestApp()
