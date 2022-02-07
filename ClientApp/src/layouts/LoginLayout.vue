<template>
  <section class="login-layout">
    <AppHeader class="login-layout__header" />
    <LoginForm
      :error-message="errorMessage"
      class="login-layout__form"
      @submit="onSubmit"
    />
    <AppFooter class="login-layout__footer" />
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, onBeforeUnmount, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/useLoginStore'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoginForm from '@/components/LoginForm.vue'
import { useMainStore } from '@/store/useMainStore'

export default defineComponent({
  name: 'LoginLayout',
  components: {
    AppHeader,
    AppFooter,
    LoginForm
  },
  setup () {
    const router = useRouter()
    const loginStore = useLoginStore()
    const mainStore = useMainStore()
    const { isSuccessLogin } = storeToRefs(loginStore)
    const errorMessage = ref('')

    onMounted(async () => {
      if (!mainStore.userInfo) {
        await mainStore.getUserInfo()

        if (mainStore.userInfo) {
          router.push({ path: '/' })
        }
      }
    })

    const onSubmit = async (model: { email: string, password: string }) => {
      await loginStore.login(model)
      errorMessage.value = !isSuccessLogin.value
        ? 'We didn\'t recognize the username or password you entered.'
        : ''
    }

    watch(isSuccessLogin, () => {
      router.push({ path: '/' })
    })

    onBeforeUnmount(() => {
      loginStore.clearData()
    })

    return {
      onSubmit,
      errorMessage
    }
  }
})
</script>

<style lang="scss">
.login-layout {
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

  &__form {
    margin: calc(50% - 250px) auto 0 auto;
    max-width: 400px;
  }
}
</style>
