<template>
  <div class="match-item">
    <div class="match-item__status">
      {{ status }}
    </div>

    <div class="match-item__main-info">
      <div class="match-item__team-info">
        <MatchItemTeam
          :team-name="homeTeamName"
          :logo="homeTeamLogo"
        />
        <MatchItemScore
          :score="homeTeamScore"
          :match-satus="matchSatus"
          class="match-item__score"
        />
      </div>
      <div class="match-item__team-info">
        <MatchItemTeam
          :team-name="awayTeamName"
          :logo="awayTeamLogo"
        />
        <MatchItemScore
          :score="awayTeamScore"
          :match-satus="matchSatus"
          class="match-item__score"
        />
      </div>
    </div>

    <div class="match-item__stage">
      {{ stage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MatchItemTeam from './MatchItemTeam.vue'
import MatchItemScore from './MatchItemScore.vue'
import { MatchSatuses } from '@/utils/enums'

export default defineComponent({
  name: 'MatchItem',
  components: {
    MatchItemTeam,
    MatchItemScore
  },
  props: {
    status: {
      type: String,
      default: 'status'
    },
    stage: {
      type: String,
      default: 'stage'
    },
    homeTeamName: {
      type: String,
      default: 'homeTeamName'
    },
    homeTeamLogo: {
      type: String,
      default: ''
    },
    homeTeamScore: {
      type: Number,
      default: 0
    },
    awayTeamName: {
      type: String,
      default: 'awayTeamName'
    },
    awayTeamLogo: {
      type: String,
      default: ''
    },
    awayTeamScore: {
      type: Number,
      default: 0
    },
    matchSatus: {
      type: String as PropType<MatchSatuses>,
      default: MatchSatuses.SCHEDULED
    }
  }
})
</script>

<style lang="scss">
.match-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

  &__team-info {
    display: flex;
    justify-content: flex-end;
    white-space: nowrap;
    width: calc(50% - 2px);

    .match-item-team {
      &__logo {
        margin: 0 5px;
      }
    }
  }

  &__team-info + &__team-info {
    flex-direction: row-reverse;

    .match-item-team {
      flex-direction: row-reverse;

      &__logo {
        margin: 0 5px;
      }
    }
  }

  &__main-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
  }

  &__status,
  &__stage {
    color: $color-brand-gray-dark;
    min-width: 100px;
  }

  &__stage {
    text-align: center;
  }

  &__status {
    text-align: left;
  }
}
</style>
