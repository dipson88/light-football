import express, { Application } from 'express'
import errorHandler from './middleware/error'
import sendIndexHtml from './middleware/sendFile'
import usersRoutes from './routes/users'
import postsRoutes from './routes/posts'
import matchesRoutes from './routes/mathes'

const app: Application = express()

app.use(express.json())
app.use(usersRoutes)
app.use(matchesRoutes)
app.use(postsRoutes)
app.use(errorHandler)
app.use(sendIndexHtml)

export default app
