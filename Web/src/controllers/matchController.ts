import { Request, Response } from 'express'
import matchService from '../services/matchService'
import { MatchSatusFilterTypes } from '../utils/enums'

const getAllMatches = async (req: Request, res: Response) => {
  const filterType = req.query.filterType
    ? Number(req.query.filterType) as MatchSatusFilterTypes
    : null

  if (!filterType) {
    return res.status(200).send([])
  }

  const matches = await matchService.getMatches(filterType)

  return res.status(200).send(matches)
}

export default {
  getAllMatches
}
