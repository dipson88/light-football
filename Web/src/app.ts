import express, { Application } from 'express'
import compression from 'compression'
import * as path from 'path'
import errorMiddleware from './middleware/errorMiddleware'
import sendIndexHtml from './middleware/sendFileMiddleware'
import routers from './routes'
import { apiFrefixName } from './utils/variables'

const app: Application = express()

app.use(express.json())
app.use(compression())
app.use(express.static(path.join(__dirname, './public')))

// Set Routers
routers.forEach(router => {
  app.use(apiFrefixName, router)
})

// Set Errors Handlers
app.use(errorMiddleware.errorHandler)
app.use(errorMiddleware.notExistControllerHandler)

// Set index.html file send
app.use(sendIndexHtml)

export default app
