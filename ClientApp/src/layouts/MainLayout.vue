<template>
  <main class="main-layout">
    <AppHeader class="main-layout__header" />
    <Suspense>
      <template #default>
        <router-view v-if="isUserLoaded" />
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </Suspense>

    <AppFooter class="main-layout__footer" />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/useUserStore'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter
  },
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

<style lang="scss">
.main-layout {
  min-height: 100vh;
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
