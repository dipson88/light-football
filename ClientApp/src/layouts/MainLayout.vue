<template>
  <div class="main-layout">
    <router-view v-if="isUserLoaded" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const userStore = useUserStore()
    const { isUserLoaded, userInfo } = storeToRefs(userStore)

    onMounted(async () => {
      if (!userInfo.value) {
        await userStore.getUserInfo()
      }
    })

    return {
      isUserLoaded
    }
  }
})
</script>
