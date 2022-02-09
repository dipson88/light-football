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
          :is-started="isStarted"
          class="match-item__score"
        />
      </div>
      <div class="match-item__team-info">
        <MatchItemScore
          :score="awayTeamScore"
          :is-started="isStarted"
          class="match-item__score"
        />
        <MatchItemTeam
          :team-name="awayTeamName"
          :logo="awayTeamLogo"
        />
      </div>
    </div>

    <div class="match-item__stage">
      {{ stage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MatchItemTeam from './MatchItemTeam.vue'
import MatchItemScore from './MatchItemScore.vue'

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
    isStarted: {
      type: Boolean,
      default: false
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
    align-items: center;
  }

  &__main-info {
    display: flex;
    justify-content: center;
    max-width: 450px;
    overflow: hidden;
  }

  &__score:nth-child(1) {
    margin: 0 5px 0 0;
  }

  &__score:nth-child(2) {
    margin: 0 2px 0 5px;
  }

  &__status,
  &__stage {
    text-align: center;
    color: $color-brand-gray-dark;
  }
}
</style>
