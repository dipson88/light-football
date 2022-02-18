<template>
  <div class="match-list">
    <slot name="header">
      <MatchListHeader :header-text="headerText" />
    </slot>
    <template v-if="isMatchesExist">
      <MatchItem
        v-for="match in mappedMatches"
        :key="match.id"
        :status="match.status"
        :stage="match.stage"
        :home-team-name="match.homeTeamName"
        :home-team-logo="match.homeTeamLogo"
        :home-team-score="match.homeTeamScore"
        :away-team-name="match.awayTeamName"
        :away-team-logo="match.awayTeamLogo"
        :away-team-score="match.awayTeamScore"
        :match-satus="match.matchSatus"
        class="match-list__item"
        @click="onMatchSelect(match.id)"
      />
    </template>
    <div
      v-else
      class="match-list__no-data"
    >
      {{ t('no_data_to_display') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import MatchItem from './MatchItem.vue'
import MatchListHeader from './MatchListHeader'
import { MatchType } from '@/utils/types'
import { useI18n } from 'vue-i18n'
import { dateFormatters } from '@/utils'

export default defineComponent({
  name: 'MatchList',
  components: {
    MatchItem,
    MatchListHeader
  },
  props: {
    matches: {
      type: Array as PropType<MatchType[]>,
      default: () => []
    },
    headerText: {
      type: String,
      default: ''
    }
  },
  emits: {
    'match-select': (id: number) => id
  },
  setup (props, vm) {
    const { t } = useI18n()

    const mappedMatches = computed(() => {
      return props.matches.map(m => ({
        id: m.id,
        status: dateFormatters.toLocaleDate(m.utcDate.toString()),
        stage: t('round', { number: m.matchday }),
        homeTeamName: m.homeTeam.shortName,
        homeTeamLogo: m.homeTeam.crestUrl,
        homeTeamScore: m.score.fullTime.homeTeam,
        awayTeamName: m.awayTeam.shortName,
        awayTeamLogo: m.awayTeam.crestUrl,
        awayTeamScore: m.score.fullTime.awayTeam,
        matchSatus: m.status
      }))
    })
    const isMatchesExist = computed(() => {
      return !!mappedMatches.value.length
    })

    const onMatchSelect = (id: number) => {
      vm.emit('match-select', id)
    }

    return {
      t,
      mappedMatches,
      isMatchesExist,
      onMatchSelect
    }
  }
})
</script>

<style lang="scss">
.match-list {
  &__item {
    font-size: 12px;
    background-color: darken($color-brand-white, 5%);
    cursor: pointer;

    &:hover {
      background-color: darken($color-brand-white, 3%);
    }
  }

  &__header {
    background-color: darken($color-brand-gray, 15%);
    color: $color-brand-white;
    font-size: 12px;
    padding: 5px 20px;
    min-height: 25px;
    box-sizing: border-box;
  }

  &__no-data {
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
  }
}
</style>
