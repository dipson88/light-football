import { defineStore } from 'pinia'
import { api } from '@/api'
import { PostType } from '@/utils/types'
import { IPostInput, IPostEditInput } from '@/interfaces'

export const usePostStore = defineStore('posts', {
  state: (): {
    _posts: PostType[] // TODO
    _post: PostType | null
  } => ({
    _posts: [],
    _post: null
  }),
  getters: {
    posts: (state) => {
      return state._posts.map(post => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt)
      }))
    },
    post: (state) => state._post
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
    },
    async editPost (postInput: IPostEditInput) {
      try {
        await api.posts.post.editPost(postInput)

        return true
      } catch {
        return false
      }
    },
    async getPostById (postId: string) {
      try {
        const response = await api.posts.get.postById(postId)
        this._post = response.data ?? null

        return true
      } catch {
        return false
      }
    }
  }
})
