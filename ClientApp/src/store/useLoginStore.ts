import { defineStore } from 'pinia'
import { api } from '@/api'

const appToken = 'app-token'

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: localStorage.getItem(appToken) ?? ''
  }),
  getters: {
    isSuccessLogin: (state) => {
      return !!state.token.length
    }
  },
  actions: {
    async login (model: { email: string, password: string }) {
      try {
        const response = await api.authenticate.post.login(model)
        this.token = response.data?.token ?? ''
        localStorage.setItem(appToken, this.token)
      } catch (ex) {
        this.token = ''
      }
    }
  }
})
