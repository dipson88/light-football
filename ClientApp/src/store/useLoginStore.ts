import { defineStore } from 'pinia'
import { api } from '@/api'
import { ILoginUserInput } from '@/interfaces'

const appAccessToken = 'app-access-token'
const appRefreshToken = 'app-refresh-token'

type TokenDataType = { accessToken: string; refreshToken: string } | undefined;

export const useLoginStore = defineStore('login', {
  state: () => ({
    accessToken: localStorage.getItem(appAccessToken) ?? '',
    refreshToken: localStorage.getItem(appRefreshToken) ?? ''
  }),
  getters: {
    isLoggedUser: (state) => {
      return !!state.accessToken.length && !!state.refreshToken.length
    }
  },
  actions: {
    setTokens (data: TokenDataType) {
      this.accessToken = data?.accessToken ?? ''
      this.refreshToken = data?.refreshToken ?? ''
      localStorage.setItem(appAccessToken, this.accessToken)
      localStorage.setItem(appRefreshToken, this.refreshToken)
    },
    removeTokens () {
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.removeItem(appAccessToken)
      localStorage.removeItem(appRefreshToken)
    },
    async login (model: Partial<ILoginUserInput>) {
      try {
        const response = await api.authenticate.post.login(model)
        this.setTokens(response.data)

        return true
      } catch {
        this.removeTokens()

        return false
      }
    },
    async refreshCredentials () {
      try {
        const response = await api.authenticate.post.refreshToken()
        this.setTokens(response.data)

        return true
      } catch {
        this.removeTokens()

        return false
      }
    },
    logOut () {
      this.removeTokens()
    }
  }
})
