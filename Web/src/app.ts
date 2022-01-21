import express, { Application } from 'express'
import usersRoutes from './routes/users'

const app: Application = express()

app.use(express.json())
app.use(usersRoutes)

app.get('/', (req, res) => {
  res.send('Hello TS')
})

export default app
