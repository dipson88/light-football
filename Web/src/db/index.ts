import { createConnection } from 'typeorm'
import entities from '../entities'

const setDbConnection = async (url: string | undefined) => {
  const connection = await createConnection({
    type: 'mongodb',
    url,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities,
    useUnifiedTopology: true
  })

  return connection
}

export default {
  setDbConnection
}
