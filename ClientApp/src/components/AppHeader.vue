<template>
  <header class="app-header">
    <h2 class="app-header__title">
      The Light
    </h2>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeader'
})
</script>

<style lang="scss">
.app-header {
  background-color: $color-header;
  height: $height-header;
  line-height: $height-header;

  &__title {
    color: $color-brand-white;
  }
}
</style>
