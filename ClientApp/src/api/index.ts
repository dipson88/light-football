import axios from 'axios'
import router from '@/router'
import { useLoginStore } from '@/store/useLoginStore'
import { enums, routerHelper } from '@/utils'
import { ILoginUserInput, IPostInput } from '@/interfaces'
import { MatchSatusFilterTypes } from '@/utils/enums'

const refreshTokenUrl = 'auth/refresh'

axios.defaults.baseURL = '/api/'
axios.interceptors.request.use((request) => {
  const loginStore = useLoginStore()

  const isRefresh = request.url === refreshTokenUrl
  const isAnyTokenExist = loginStore.accessToken || loginStore.refreshToken

  if (request.headers && isAnyTokenExist) {
    request.headers.Authorization = `Bearer ${
      isRefresh ? loginStore.refreshToken : loginStore.accessToken
    }`
  }

  return request
})
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const loginStore = useLoginStore()

    switch (error.response.status) {
      case enums.HttpStatuses.Status401: {
        loginStore.removeTokens()
        router.push({ name: routerHelper.names.Login })
        break
      }
      case enums.HttpStatuses.Status403: {
        await loginStore.refreshCredentials()

        if (loginStore.accessToken && loginStore.refreshToken) {
          error.config.headers.Authorization = `Bearer ${loginStore.accessToken}`

          return await axios.request(error.config)
        } else {
          router.push({ name: routerHelper.names.Login })
        }

        break
      }
      case enums.HttpStatuses.Status404: {
        router.push({ name: routerHelper.names.Error404 })
        break
      }
      case enums.HttpStatuses.Status500: {
        router.push({ name: routerHelper.names.Error500 })
        break
      }
    }

    return Promise.reject(error)
  }
)

const api = {
  authenticate: {
    post: {
      login ({ email, password }: Partial<ILoginUserInput>) {
        return axios.post('auth/login', { email, password })
      },
      refreshToken () {
        return axios.post(refreshTokenUrl)
      }
    }
  },
  users: {
    get: {
      userInfo () {
        return axios.get('users/info')
      }
    },
    post: {
      createUser (model: ILoginUserInput) {
        return axios.post('users/create', model)
      }
    }
  },
  matches: {
    get: {
      allMatches (filterType: MatchSatusFilterTypes) {
        return axios.get('matches/all', { params: { filterType } })
      },
      matchInfo (matchId: number) {
        return axios.get('matches/match-info', { params: { matchId } })
      }
    }
  },
  posts: {
    get: {
      postByMatchId (matchId: number) {
        return axios.get('posts/post-by-match', { params: { matchId } })
      }
    },
    post: {
      createPost (model: IPostInput) {
        return axios.post('/posts/create', model)
      }
    }
  }
}

export default {
  api
}

export { api }
