import { defineStore } from 'pinia'
import { api } from '@/api'
import { MatchType, CompetitionType } from '@/utils/types'

export const useMatchesStore = defineStore('matches', {
  state: (): {
    matches: MatchType[],
    competition: CompetitionType | null
  } => ({
    matches: [],
    competition: null
  }),
  actions: {
    async getMatches () {
      try {
        const response = await api.matches.get.allMatches()
        this.matches = response.data.matches ?? []
        this.competition = response.data.competition ?? null
      } catch {
        this.matches = []
        this.competition = null
      }
    }
  }
})
