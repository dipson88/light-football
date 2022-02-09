<template>
  <div class="match-item-team">
    <div class="match-item-team__name">
      {{ teamName }}
    </div>
    <img
      v-if="logo"
      :src="logo"
      class="match-item-team__logo"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MatchItemTeam',
  props: {
    teamName: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss">
.match-item-team {
  background-color: transparent;
  display: flex;
  align-items: center;

  &__name {
    color: $color-info;
  }

  &__logo {
    width: 20px;
    height: 20px;
  }
}
</style>
