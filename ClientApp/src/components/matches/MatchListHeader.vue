<template>
  <p class="match-list-header">
    {{ headerText }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MatchList',
  props: {
    headerText: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss">
.match-list-header {
  background-color: darken($color-brand-gray, 15%);
  color: $color-brand-white;
  font-size: 12px;
  padding: 5px 20px;
  margin: 0;
  min-height: 25px;
  box-sizing: border-box;
}
</style>
