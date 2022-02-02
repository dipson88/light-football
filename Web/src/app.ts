import express, { Application } from 'express'
import errorMiddleware from './middleware/errorMiddleware'
import sendIndexHtml from './middleware/sendFileMiddleware'
import usersRouter from './routes/usersRouter'
import postsRouter from './routes/postRouter'
import predicitionsRoute from './routes/predictionRouter'
import matchesRouter from './routes/mathes'

const app: Application = express()

app.use(express.json())
app.use(usersRouter)
app.use(postsRouter)
app.use(predicitionsRoute)
app.use(matchesRouter)
app.use(errorMiddleware)
app.use(sendIndexHtml)

export default app
