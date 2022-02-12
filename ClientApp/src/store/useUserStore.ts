import { defineStore } from 'pinia'
import { api } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    isUserLoaded: false
  }),
  actions: {
    async getUserInfo () {
      try {
        const response = await api.users.get.userInfo()
        this.userInfo = response.data
        this.isUserLoaded = true
      } catch {
        this.userInfo = null
        this.isUserLoaded = false
      }
    }
  }
})
