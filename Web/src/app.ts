import express, { Application } from 'express'
import errorHandler from './middleware/error'
import sendIndexHtml from './middleware/sendFile'
import usersRoute from './routes/users'
import postsRoute from './routes/posts'
import matchesRoute from './routes/mathes'
import predicitionsRoute from './routes/predictions'

const app: Application = express()

app.use(express.json())
app.use(usersRoute)
app.use(matchesRoute)
app.use(postsRoute)
app.use(predicitionsRoute)
app.use(errorHandler)
app.use(sendIndexHtml)

export default app
