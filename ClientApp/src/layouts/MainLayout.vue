<template>
  <main class="main-layout">
    <AppHeader
      :is-logged-user="isLoggedUser"
      class="main-layout__header"
      @logout="onLogOut"
    />
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
import { useLoginStore } from '@/store/useLoginStore'
import { useRouter } from 'vue-router'
import { routerHelper } from '@/utils'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter
  },
  setup () {
    const loginStore = useLoginStore()
    const router = useRouter()
    const userStore = useUserStore()
    const { isUserLoaded, userInfo } = storeToRefs(userStore)

    onMounted(async () => {
      if (!userInfo.value) {
        await userStore.getUserInfo()
      }
    })

    const onLogOut = () => {
      loginStore.logOut()
      router.push({ name: routerHelper.names.Login })
    }

    return {
      isUserLoaded,
      onLogOut,
      isLoggedUser: loginStore.isLoggedUser
    }
  }
})
</script>

<style lang="scss">
.main-layout {
  min-height: 100vh;
  box-sizing: border-box;
  padding: $height-header 0 $height-footer-padding 0;
}
</style>
