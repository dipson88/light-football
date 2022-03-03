<template>
  <footer class="app-footer" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppFooter'
})
</script>

<style lang="scss">
.app-footer {
  z-index: $z-index-navbar;
  background-color: $color-footer;
  color: $color-brand-white;
  height: $height-footer;
  line-height: $height-footer;
}
</style>
