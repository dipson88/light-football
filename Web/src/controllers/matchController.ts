import { Request, Response } from 'express'
import axios from 'axios'
import { writeFile, readFileSync } from 'fs'
import { Competition, Match } from '../entities/match'

// TODO: Test data
const saveTestData = (data: unknown) => {
  const json = JSON.stringify(data)
  writeFile('testData.json', json, () => {
    // empty function for ts
  })
}

const getTestData = () => {
  try {
    const data = readFileSync('testData.json')

    return JSON.parse(data.toString())
  } catch {
    return null
  }
}

const getCurrMachdayMatches = (data: { matches: { season: { currentMatchday: number }, matchday: number }[] }) => {
  const filterd = data.matches.filter(match => match.matchday === match.season.currentMatchday) as unknown []

  return filterd.map(match => new Match(match as Match))
}

const getCompetitionInfo = (data: { competition: Competition }) => {
  return new Competition(data.competition)
}

const getAllMatches = async (req: Request, res: Response) => {
  const testData = getTestData()

  if (testData) {
    return res.status(200).send({
      competition: getCompetitionInfo(testData),
      matches: getCurrMachdayMatches(testData).slice(0, 3)
    })
  }

  // TODO add create all matches method
  const response = await axios.get('http://api.football-data.org/v2/competitions/FL1/matches', {
    headers: {
      'X-Auth-Token':  process.env.FOOTBAL_DATA_KEY ?? ''
    },
    params: {
      // www.football-data.org/documentation/api#filters
      // competitions: 'FL1',
      // matchday: 1,
      season: '2021'
    }
  })

  saveTestData(response.data)

  res.status(200).send({ matches: response.data })
}

export default {
  getAllMatches
}
