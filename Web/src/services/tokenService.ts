import jwt from 'jsonwebtoken'

const createToken = (usdeId: string, secret: string, expiresIn: string) => {
  return jwt.sign({ usdeId }, secret, { expiresIn })
}

const verifyToken = (
  token: string,
  secret: string
): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, secret) as { userId: string }

    return decoded
  } catch {
    return null
  }
}

const createUserToken = (usdeId: string) => {
  return createToken(usdeId, process.env.JWT_SECRET ?? '', '30m')
}

const createRefreshToken = (usdeId: string) => {
  return createToken(usdeId, process.env.JWT_SECRET_REFRESH ?? '', '10h')
}

const verifyUserToken = (token: string) => {
  return verifyToken(token, process.env.JWT_SECRET ?? '')
}

const verifyRefreshToken = (refreshToken: string) => {
  return verifyToken(refreshToken, process.env.JWT_SECRET_REFRESH ?? '')
}

export {
  createUserToken,
  createRefreshToken,
  verifyUserToken,
  verifyRefreshToken
}

export default {
  createUserToken,
  createRefreshToken,
  verifyUserToken,
  verifyRefreshToken
}
