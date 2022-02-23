import { defineStore } from 'pinia'
import { api } from '@/api'
import { ILoginUserInput } from '@/interfaces'

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
    },
    async createUser (model: ILoginUserInput) {
      try {
        await api.users.post.createUser(model)

        return true
      } catch {
        return false
      }
    }
  }
})
