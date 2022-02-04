import jwt from 'jsonwebtoken'

const createUserToken = (usdeId: string) => {
  return jwt.sign({ usdeId }, process.env.JWT_SECRET ?? '')
}

const verifyUserToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string }

    return decoded
  } catch {
    return null
  }
}

export {
  createUserToken,
  verifyUserToken
}

export default {
  createUserToken,
  verifyUserToken
}
