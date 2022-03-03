<template>
  <header class="app-header">
    <router-link
      :to="toMainPageRoute"
      class="app-header__title"
    >
      The Light
    </router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routerHelper } from '@/utils'

export default defineComponent({
  name: 'AppHeader',
  setup () {
    return {
      toMainPageRoute: {
        name: routerHelper.names.Home
      }
    }
  }
})
</script>

<style lang="scss">
.app-header {
  z-index: $z-index-navbar;
  background-color: $color-header;
  height: $height-header;
  line-height: $height-header;

  &__title {
    color: $color-brand-white;
    font-weight: $font-weight-medium;
    font-size: 22px;
    text-decoration: none;
  }
}
</style>
