import { defineStore } from 'pinia'
import { api } from '@/api'
import { PostType } from '@/utils/types'
import { IPostInput } from '@/interfaces'

export const usePostStore = defineStore('posts', {
  state: (): {
    _posts: PostType[] // TODO
  } => ({
    _posts: []
  }),
  getters: {
    posts: (state) => {
      return state._posts.map(post => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt)
      }))
    }
  },
  actions: {
    async getPostsByMatchId (matchId: number) {
      try {
        const response = await api.posts.get.postByMatchId(matchId)
        this._posts = response.data || []
      } catch {
        this._posts = []
      }
    },
    async createPost (postInput: IPostInput) {
      try {
        await api.posts.post.createPost(postInput)

        return true
      } catch {
        return false
      }
    }
  }
})
