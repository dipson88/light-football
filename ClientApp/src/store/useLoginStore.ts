import { defineStore } from 'pinia'
import { api } from '@/api'

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: ''
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
      } catch (ex) {
        this.token = ''
      }
    },
    clearData () {
      this.token = ''
    }
  }
})
