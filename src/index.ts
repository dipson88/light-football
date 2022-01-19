import express, { Application } from 'express'

const app: Application = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello TS')
})

app.listen(PORT, () => {
  console.log(`Server is runnung on port ${PORT}`)
})
