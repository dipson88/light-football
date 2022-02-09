<template>
  <div class="match-list">
    <slot name="header">
      <div class="match-list__header">
        TODO header
      </div>
    </slot>
    <MatchItem class="match-list__item" />
    <MatchItem class="match-list__item" />
    <MatchItem class="match-list__item" />
    <MatchItem class="match-list__item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MatchItem from './MatchItem.vue'
import { MatchType } from '@/utils/types'

export default defineComponent({
  name: 'MatchList',
  components: {
    MatchItem
  },
  props: {
    matches: {
      type: Array as PropType<MatchType[]>,
      default: () => []
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
  }
}
</style>
