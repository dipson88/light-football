import { Request, Response } from 'express'
import * as path from 'path'

const sendIndexHtml = (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, '../public/index.html'))
}

export default sendIndexHtml
