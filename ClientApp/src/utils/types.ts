import { MatchSatuses } from './enums'

export type MatchType = {
  id: number
  utcDate: Date
  matchday: string
  status: MatchSatuses
  score: {
    winner: string
    fullTime: {
      homeTeam: number
      awayTeam: number
    }
  }
  homeTeam: {
    id: number
    name: string,
    shortName: string,
    crestUrl: string
  }
  awayTeam: {
    id: number
    name: string,
    shortName: string,
    crestUrl: string
  }
}

export type CompetitionType = {
  id: number
  name: string
  code: string
}

export type PostType = {
  id: string
  userId: string
  matchId: number,
  content: string,
  title: string,
  updatedAt: Date,
  createdAt: Date
}
