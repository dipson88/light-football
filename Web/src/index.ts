import mongoose from 'mongoose'
import app from './app'

// TODO move env variables to the config file
const PORT = process.env.PORT || 8000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/light-football'

mongoose.connect(MONGODB_URL)

app.listen(PORT, () => {
  console.log(`Server is runnung on port ${PORT}`)
})
