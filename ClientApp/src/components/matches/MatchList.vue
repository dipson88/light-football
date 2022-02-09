<template>
  <div class="match-list">
    <slot name="header">
      <div class="match-list__header">
        {{ headerText }}
      </div>
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
        :is-started="match.isStarted"
        class="match-list__item"
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
import { MatchType } from '@/utils/types'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MatchList',
  components: {
    MatchItem
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
  setup (props) {
    const { t } = useI18n()

    const mappedMatches = computed(() => {
      return props.matches.map(m => ({
        id: m.id,
        status: m.status,
        stage: m.matchday,
        homeTeamName: m.homeTeam.name,
        homeTeamLogo: '',
        homeTeamScore: m.score.fullTime.homeTeam,
        awayTeamName: m.awayTeam.name,
        awayTeamLogo: '',
        awayTeamScore: m.score.fullTime.awayTeam,
        isStarted: false
      }))
    })
    const isMatchesExist = computed(() => {
      return !!mappedMatches.value.length
    })

    return {
      t,
      mappedMatches,
      isMatchesExist
    }
  }
})
</script>

<style lang="scss">
.match-list {
  &__item {
    font-size: 12px;
    background-color: $color-brand-gray;
    cursor: pointer;

    &:hover {
      background-color: lighten($color-brand-gray, 3%);
    }

    &:nth-child(2n) {
      background-color: $color-brand-white;

      &:hover {
        background-color: darken($color-brand-white, 3%);
      }
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
