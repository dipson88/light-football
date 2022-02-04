import { Entity } from 'typeorm'

@Entity()
export class Match {
  id: number
  utcDate: Date
  staus: string
  matchday: string
  status: string
  score: Score
  homeTeam: Team
  awayTeam: Team

  constructor (match: Match) {
    Object.assign(this, match)
  }
}

export class Competition {
  id: number
  name: string
  code: string

  constructor (match: Match) {
    Object.assign(this, match)
  }
}

class Score {
  winner: string
  fullTime: FullTime
}

class FullTime {
  homeTeam: number
  awayTeam: number
}

class Team {
  id: number
  name: string
}
