import matchService from '../services/matchService'
import { MatchSatusFilterTypes } from '../utils/enums'
import { IRequest, IResponse } from '../interfaces'

const getAllMatches = async (
  req: IRequest<unknown, { filterType?: string }>,
  res: IResponse
) => {
  const filterType = req.query.filterType
    ? Number(req.query.filterType) as MatchSatusFilterTypes
    : null

  if (!filterType) {
    return res.status(200).send([])
  }

  const { error, data } = await matchService.getMatches(filterType)

  if (error) {
    return res.status(400).send(error)
  }

  return res.status(200).send(data)
}

const getMatchInfo = async (
  req: IRequest<unknown, { matchId?: string }>,
  res: IResponse
) => {
  const matchId = req.query.matchId
    ? Number(req.query.matchId)
    : null

  if (!matchId) {
    return res.status(200).send(null)
  }

  const { error, data } = await matchService.getMatchById(matchId)

  if (error) {
    return res.status(400).send(error)
  }

  return res.status(200).send(data ?? null)
}

export default {
  getAllMatches,
  getMatchInfo
}
