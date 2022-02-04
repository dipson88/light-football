import { Entity } from 'typeorm'

@Entity()
export class Match {
  id: number
  utcDate: Date
  matchday: string
  status: string
  score: Score
  homeTeam: Team
  awayTeam: Team

  constructor (match: Match) {
    this.id = match.id
    this.utcDate = match.utcDate
    this.matchday = match.matchday
    this.status = match.status
    this.score = new Score(match.score)
    this.homeTeam = new Team (match.homeTeam)
    this.awayTeam = new Team (match.awayTeam)
  }
}

export class Competition {
  id: number
  name: string
  code: string

  constructor (competition: Competition) {
    this.id = competition.id
    this.name = competition.name
    this.code = competition.code
  }
}

class Score {
  winner: string
  fullTime: FullTime

  constructor (score: Score) {
    this.winner = score.winner
    this.fullTime = score.fullTime
  }
}

class FullTime {
  homeTeam: number
  awayTeam: number

  constructor (score: FullTime) {
    this.homeTeam = score.homeTeam
    this.homeTeam = score.awayTeam
  }
}

class Team {
  id: number
  name: string

  constructor (score: Team) {
    this.id = score.id
    this.name = score.name
  }
}
