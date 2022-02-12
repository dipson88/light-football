import { defineStore } from 'pinia'
import { api } from '@/api'
import { MatchType, CompetitionType } from '@/utils/types'
import { MatchSatusFilterTypes } from '@/utils/enums'

export const useMatchesStore = defineStore('matches', {
  state: (): {
    matches: MatchType[],
    competition: CompetitionType | null
  } => ({
    matches: [],
    competition: null
  }),
  actions: {
    async getMatches (filterType: MatchSatusFilterTypes) {
      try {
        const response = await api.matches.get.allMatches(filterType)
        this.matches = response.data.matches ?? []
        this.competition = response.data.competition ?? null
      } catch {
        this.matches = []
        this.competition = null
      }
    }
  }
})
