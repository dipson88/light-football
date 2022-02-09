<template>
  <div class="match-item-score">
    {{ formattedScore }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'MatchItemScore',
  props: {
    score: {
      type: Number,
      default: 0
    },
    isStarted: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const formattedScore = computed(() => {
      return props.isStarted ? props.score : '-'
    })

    return { formattedScore }
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
}
</style>
