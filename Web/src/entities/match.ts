import { Entity } from 'typeorm'

@Entity()
export class Match {
  id: number
  utcDate: Date
  matchday: number
  status: string
  score: Score
  homeTeam: MatchTeam
  awayTeam: MatchTeam

  constructor (match: Match) {
    this.id = match.id
    this.utcDate = match.utcDate
    this.matchday = match.matchday
    this.status = match.status
    this.score = new Score(match.score)
    this.homeTeam = new MatchTeam (match.homeTeam)
    this.awayTeam = new MatchTeam (match.awayTeam)
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

  constructor (fullTime: FullTime) {
    this.homeTeam = fullTime.homeTeam
    this.homeTeam = fullTime.awayTeam
  }
}

export class MatchTeam {
  id: number
  name: string
  shortName: string
  crestUrl: string

  constructor (matchTeam: MatchTeam) {
    this.id = matchTeam.id
    this.name = matchTeam.name
    this.shortName = matchTeam.shortName
    this.crestUrl = matchTeam.crestUrl
  }
}
