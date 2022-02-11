import axios from 'axios'
import { writeFile, readFileSync } from 'fs'
import { Competition, Match, MatchTeam } from '../entities/match'

// TODO: Test data
const saveTestData = (data: unknown, fileName: string) => {
  const json = JSON.stringify(data)
  writeFile(fileName, json, () => {
    // empty function for ts
  })
}

const getTestData = (fileName: string) => {
  try {
    const data = readFileSync(fileName)

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

const getAllMatchesFromApi = async (teams: MatchTeam[]) => {
  const testData = getTestData('testMatchesData.json')

  if (testData) {
    return mapCurrentMatches(testData.matches, testData.competition, teams)
  }

  const response = await callFootballApi({
    apiString: 'http://api.football-data.org/v2/competitions/FL1/matches',
    params: {
      season: '2021'
    }
  })

  saveTestData(response.data, 'testMatchesData.json')

  return mapCurrentMatches(response.data.matches, response.data.competition, teams)
}

const getAllTeamsFromApi = async () => {
  const testData = getTestData('testTeamsData.json')

  if (testData) {
    return mapTeams(testData.teams)
  }

  const response = await callFootballApi({
    apiString: 'http://api.football-data.org/v2/competitions/FL1/teams',
    params: {
      season: '2021'
    }
  })

  saveTestData(response.data, 'testTeamsData.json')

  return mapTeams(response.data.teams)
}

const getMatches = async () => {
  const teams = await getAllTeamsFromApi()
  const matches = await getAllMatchesFromApi(teams)

  return matches
}

const mapTeams = (teams: MatchTeam[]) => {
  return teams.map(team => new MatchTeam(team))
}

const mapCurrentMatches = (currMatches: Match[], competition: Competition, teams: MatchTeam[]) => {
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

  return {
    // TODO remove slice
    matches: matches.sort((a, b) => a.matchday - b.matchday).slice(0, 30),
    competition: new Competition(competition)
  }
}

export default {
  getMatches
}

export {
  getMatches
}
