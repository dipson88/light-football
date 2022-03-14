<template>
  <section class="match-page-info">
    <MatchListHeader
      :header-text="headerText"
      class="match-page-info__header"
    />
    <MatchItem
      :home-team-name="matchInfo.homeTeam.shortName"
      :home-team-logo="matchInfo.homeTeam.crestUrl"
      :home-team-score="matchInfo.score.fullTime.homeTeam"
      :away-team-name="matchInfo.awayTeam.shortName"
      :away-team-logo="matchInfo.awayTeam.crestUrl"
      :away-team-score="matchInfo.score.fullTime.awayTeam"
      :match-satus="matchInfo.status"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { dateFormatters } from '@/utils'
import MatchListHeader from '@/components/matches/MatchListHeader.vue'
import MatchItem from '@/components/matches/MatchItem.vue'
import { MatchType } from '@/utils/types'

export default defineComponent({
  name: 'MatchPageInfo',
  components: {
    MatchListHeader,
    MatchItem
  },
  props: {
    matchInfo: {
      type: Object as PropType<MatchType>,
      default: null
    }
  },
  setup (props) {
    const { t } = useI18n()
    const headerText = computed(() => {
      const date = dateFormatters.toLocaleDate(props.matchInfo.utcDate.toString())
      const stage = t('round', { number: props.matchInfo.matchday })

      return `${stage} - ${date}`
    })

    return {
      headerText
    }
  }
})
</script>

<style lang="scss">
.match-page-info {
  &__header {
    text-align: center;
  }

  .match-item {
    padding-top: 20px;

    &__team-info {
      align-items: center;

      .match-item-team {
        &__logo {
          height: 45px;
          width: 45px;
          margin: 0 15px;
        }
      }
    }

    &__team-info + &__team-info {
      .match-item-team {
        &__logo {
          margin: 0 15px;
        }
      }
    }

    &__stage,
    &__status {
      display: none;
    }

    &__score {
      height: 35px;
      width: 35px;
      line-height: 35px;
      font-weight: $font-weight-medium;
    }
  }
}
</style>
