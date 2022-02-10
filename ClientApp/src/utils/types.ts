export type LoginUserInputType = {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export type MatchType = {
  id: number
  utcDate: Date
  matchday: string
  status: string
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
