import express, { Application } from 'express'
import usersRoutes from './routes/users'
import postsRoutes from './routes/posts'
import matchesRoutes from './routes/mathes'

const app: Application = express()

app.use(express.json())
app.use(usersRoutes)
app.use(postsRoutes)
app.use(matchesRoutes)

app.get('/', (req, res) => {
  res.send('Hello TS')
})

export default app
