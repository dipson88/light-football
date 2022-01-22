import mongoose from 'mongoose'
import app from './app'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL ?? ''

mongoose.connect(MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is runnung on port ${PORT}`)
  })
})
