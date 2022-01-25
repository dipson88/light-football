import { Request, Response } from 'express'
import axios from 'axios'
import { writeFile, readFileSync } from 'fs'

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

const getAllMatches = async (req: Request, res: Response) => {
  const testData = getTestData()

  if (testData) {
    return res.status(200).send({ matches: testData })
  }

  // TODO add create all matches method
  const matches = await axios.get('http://api.football-data.org/v2/competitions/FL1/matches', {
    headers: {
      'X-Auth-Token': '0047ab14d053450f827269af263d9a28'
    },
    params: {
      // competitions: 'FL1',
      // matchday: 1,
      season: '2021'
    }
  })

  saveTestData(matches.data)

  res.status(200).send({ matches: matches.data })
}

export {
  getAllMatches
}

export default {
  getAllMatches
}
