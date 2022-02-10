import { Request, Response } from 'express'
import matchService from '../services/matchService'

const getAllMatches = async (req: Request, res: Response) => {
  const matches = await matchService.getMatches()

  res.status(200).send(matches)
}

export default {
  getAllMatches
}
