<template>
  <main class="error-layout">
    <AppHeader class="error-layout__header" />
    <router-view />
    <AppFooter class="error-layout__footer" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  name: 'ErrorLayout',
  components: {
    AppHeader,
    AppFooter
  }
})
</script>

<style lang="scss">
.error-layout {
  min-height: 100vh;
  box-sizing: border-box;
  padding: $height-header 0 $height-footer-padding 0;
}
</style>
