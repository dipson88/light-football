import { Request, Response } from 'express'
import axios from 'axios'

const getAllMatches = async (req: Request, res: Response) => {
  // TODO add create all matches method
  const matches = await axios.get('http://api.football-data.org/v2/competitions/FL1/matches', {
    headers: {
      'X-Auth-Token': '0047ab14d053450f827269af263d9a28'
    },
    params: {
      // competitions: 'FL1',
      matchday: 1
    }
  })

  console.log(matches.data)

  res.status(200).send({ matches: matches.data })
}

export {
  getAllMatches
}

export default {
  getAllMatches
}
