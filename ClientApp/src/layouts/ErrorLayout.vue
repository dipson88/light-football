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
  height: 100%;
  box-sizing: border-box;
  padding: $height-header 0 $height-footer 0;

  &__header,
  &__footer {
    position: fixed;
    width: 100vw;
    box-sizing: border-box;
    padding: 0 10px;
  }

  &__header {
    top: 0;
  }

  &__footer {
    bottom: 0;
  }
}
</style>
