<template>
  <div
    :class="{ 'match-item-score--in-play': isInPlay }"
    class="match-item-score"
  >
    {{ formattedScore }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { MatchSatuses } from '@/utils/enums'

export default defineComponent({
  name: 'MatchItemScore',
  props: {
    score: {
      type: Number,
      default: 0
    },
    matchSatus: {
      type: String as PropType<MatchSatuses>,
      default: MatchSatuses.SCHEDULED
    }
  },
  setup (props) {
    const formattedScore = computed(() => {
      return props.matchSatus !== MatchSatuses.SCHEDULED ? props.score : '-'
    })
    const isInPlay = computed(() => {
      return props.matchSatus === MatchSatuses.IN_PLAY
    })

    return {
      formattedScore,
      isInPlay
    }
  }
})
</script>

<style lang="scss">
.match-item-score {
  background-color: $color-success;
  color: $color-brand-white;
  text-align: center;
  line-height: 20px;
  width: 20px;
  height: 20px;

  &--in-play {
    background-color: $color-live;
  }
}
</style>
