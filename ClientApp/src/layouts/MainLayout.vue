<template>
  <div class="main-layout">
    <router-view v-if="isUserLoaded" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store/useMainStore'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const mainStore = useMainStore()
    const { isUserLoaded, userInfo } = storeToRefs(mainStore)

    onMounted(async () => {
      if (!userInfo.value) {
        await mainStore.getUserInfo()
      }
    })

    return {
      isUserLoaded
    }
  }
})
</script>
