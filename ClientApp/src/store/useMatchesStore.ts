import { defineStore } from 'pinia'
import { api } from '@/api'
import { MatchType, CompetitionType } from '@/utils/types'
import { MatchSatusFilterTypes } from '@/utils/enums'

const mapMatch = (match: MatchType) => {
  return {
    ...match,
    utcDate: new Date(match.utcDate)
  }
}

export const useMatchesStore = defineStore('matches', {
  state: (): {
    _matches: MatchType[],
    _competition: CompetitionType | null,
    _matchInfo: MatchType | null
  } => ({
    _matches: [],
    _competition: null,
    _matchInfo: null
  }),
  getters: {
    matches: (state) => {
      return state._matches.map(mapMatch)
    },
    matchInfo: (state) => {
      return state._matchInfo ? mapMatch(state._matchInfo) : null
    },
    competition: (state) => {
      return state._competition
    }
  },
  actions: {
    async getMatches (filterType: MatchSatusFilterTypes) {
      try {
        const response = await api.matches.get.allMatches(filterType)
        this._matches = response.data.matches || []
        this._competition = response.data.competition || null
      } catch {
        this._matches = []
        this._competition = null
      }
    },
    async getMatchInfoById (matchId: number) {
      try {
        const response = await api.matches.get.matchInfo(matchId)
        this._matchInfo = response.data || null
      } catch {
        this._matchInfo = null
      }
    }
  }
})
