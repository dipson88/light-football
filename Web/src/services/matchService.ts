import axios from 'axios'
import { promises, existsSync } from 'fs'
import { Competition, Match, MatchTeam } from '../entities/match'
import { MatchSatuses, MatchSatusFilterTypes } from '../utils/enums'

// TODO: Test data
const saveTestData = async (data: unknown, fileName: string) => {
  const json = JSON.stringify(data)

  if (!existsSync('testData')) {
    await promises.mkdir('testData')
  }

  await promises.writeFile(`./testData/${fileName}`, json)
}

const getTestData = async (fileName: string) => {
  try {
    const data = await promises.readFile(`./testData/${fileName}`)

    return JSON.parse(data.toString())
  } catch {
    return null
  }
}

const callFootballApi = async ({ apiString, params }: { apiString: string, params: unknown }) => {
  return await axios.get(apiString, {
    headers: {
      'X-Auth-Token':  process.env.FOOTBAL_DATA_KEY ?? ''
    },
    params
  })
}

const getAllMatchesFromApi = async (teams: MatchTeam[], filterType: MatchSatusFilterTypes) => {
  const testData = await getTestData('testMatchesData.json')

  if (testData) {
    return mapMatches(
      testData.matches,
      testData.competition,
      teams,
      filterType)
  }

  const response = await callFootballApi({
    apiString: 'http://api.football-data.org/v2/competitions/FL1/matches',
    params: {
      season: '2021'
    }
  })

  await saveTestData(response.data, 'testMatchesData.json')

  return mapMatches(
    response.data.matches,
    response.data.competition,
    teams,
    filterType)
}

const getAllTeamsFromApi = async () => {
  const testData = await getTestData('testTeamsData.json')

  if (testData) {
    return mapTeams(testData.teams)
  }

  const response = await callFootballApi({
    apiString: 'http://api.football-data.org/v2/competitions/FL1/teams',
    params: {
      season: '2021'
    }
  })

  await saveTestData(response.data, 'testTeamsData.json')

  return mapTeams(response.data.teams)
}

const mapTeams = (teams: MatchTeam[]) => {
  return teams.map(team => new MatchTeam(team))
}

const mapMatches = (currMatches: Match[], competition: Competition, teams: MatchTeam[], filterType: MatchSatusFilterTypes) => {
  const matches = currMatches.map(match => {
    const homeTeam = teams.find(team => team.id === match.homeTeam.id)
    const awayTeam = teams.find(team => team.id === match.awayTeam.id)

    if (homeTeam) {
      match.homeTeam = homeTeam
    }

    if (awayTeam) {
      match.awayTeam = awayTeam
    }

    return new Match(match)
  })

  const mappedCompetition = new Competition(competition)
  const filteredMatches = filterMatches(matches, filterType)
    .sort((a, b) => a.matchday - b.matchday)

  return {
    competition: mappedCompetition,
    matches: filteredMatches
  }
}

const filterMatches = (matches: Match[], filterType: MatchSatusFilterTypes) => {
  switch (filterType) {
    case MatchSatusFilterTypes.UPCOMING: {
      return matches.filter(m => m.status === MatchSatuses.SCHEDULED)
    }
    case MatchSatusFilterTypes.FINISHED: {
      return matches.filter(m => m.status === MatchSatuses.FINISHED)
    }
    case MatchSatusFilterTypes.CURRENT: {
      return matches.filter(m => m.matchday === m.season.currentMatchday)
    }
    default: {
      return []
    }
  }
}

const getMatches = async (filterType: MatchSatusFilterTypes) => {
  try {
    const teams = await getAllTeamsFromApi()
    const matches = await getAllMatchesFromApi(teams, filterType)

    return { error: null, data: matches || [] }
  } catch (error) {
    return { error: error, data: null }
  }
}

export default {
  getMatches
}

export {
  getMatches
}
