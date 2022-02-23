<template>
  <section class="create-user">
    <CreateUserForm
      :error-message="errorMessage"
      class="create-user__form"
      @submit="onSubmit"
      @login="onLogin"
    />
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'
import CreateUserForm from '@/components/CreateUserForm.vue'
import { routerHelper } from '@/utils'
import { useI18n } from 'vue-i18n'
import { ILoginUserInput } from '@/interfaces'

export default defineComponent({
  name: 'CreateUser',
  components: {
    CreateUserForm
  },
  setup () {
    const router = useRouter()
    const userStore = useUserStore()
    const { t } = useI18n()
    const errorMessage = ref('')

    const onSubmit = async (model: ILoginUserInput) => {
      const isSuccess = await userStore.createUser(model)

      if (isSuccess) {
        errorMessage.value = ''
        router.push({ name: routerHelper.names.Home })
      } else {
        errorMessage.value = t('this_emai_address_is_already')
      }
    }
    const onLogin = async () => {
      router.push({ name: routerHelper.names.Login })
    }

    return {
      onSubmit,
      onLogin,
      errorMessage
    }
  }
})
</script>

<style lang="scss">
.create-user {
  &__form {
    margin: 10% auto 0;
    max-width: 400px;
  }
}
</style>
