<template>
  <div class="main-layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store/useMainStore'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const store = useMainStore()

    return {
      store
    }
  }
})
</script>
