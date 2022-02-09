<template>
  <section class="login-page">
    <LoginForm
      :error-message="errorMessage"
      class="login-page__form"
      @submit="onSubmit"
      @create="onCreate"
    />
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/useLoginStore'
import LoginForm from '@/components/LoginForm.vue'
import { routerHelper } from '@/utils'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm
  },
  setup () {
    const router = useRouter()
    const loginStore = useLoginStore()
    const { t } = useI18n()
    const errorMessage = ref('')

    onMounted(async () => {
      if (loginStore.token) {
        router.push({ name: routerHelper.names.Home })
      }
    })

    const onSubmit = async (model: { email: string, password: string }) => {
      const isSuccess = await loginStore.login(model)

      if (isSuccess) {
        errorMessage.value = ''
        router.push({ name: routerHelper.names.Home })
      } else {
        errorMessage.value = t('we_didnt_recognize_the_email')
      }
    }
    const onCreate = async () => {
      router.push({ name: routerHelper.names.CreateUser })
    }

    return {
      onCreate,
      onSubmit,
      errorMessage
    }
  }
})
</script>

<style lang="scss">
.login-page {
  &__form {
    margin: 150px auto 0;
    max-width: 400px;
  }
}
</style>
