import { defineStore } from 'pinia'
import { api } from '@/api'
import { LoginUserInputType } from '@/utils/types'

const appToken = 'app-token'

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: localStorage.getItem(appToken) ?? ''
  }),
  actions: {
    async login (model: Partial<LoginUserInputType>) {
      try {
        const response = await api.authenticate.post.login(model)
        this.token = response.data?.token ?? ''
        localStorage.setItem(appToken, this.token)

        return true
      } catch (ex) {
        this.token = ''
        localStorage.removeItem(appToken)

        return false
      }
    },
    async createUser (model: LoginUserInputType) {
      try {
        this.token = ''
        const response = await api.users.post.createUser(model)
        this.token = response.data?.token ?? ''
        localStorage.setItem(appToken, this.token)

        return true
      } catch (ex) {
        this.token = ''
        localStorage.removeItem(appToken)

        return false
      }
    }
  }
})
