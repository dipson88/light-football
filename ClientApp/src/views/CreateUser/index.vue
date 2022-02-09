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
import { useLoginStore } from '@/store/useLoginStore'
import CreateUserForm from '@/components/CreateUserForm.vue'
import { routerHelper } from '@/utils'
import { useI18n } from 'vue-i18n'
import { LoginUserInputType } from '@/utils/types'

export default defineComponent({
  name: 'CreateUser',
  components: {
    CreateUserForm
  },
  setup () {
    const router = useRouter()
    const loginStore = useLoginStore()
    const { t } = useI18n()
    const errorMessage = ref('')

    const onSubmit = async (model: LoginUserInputType) => {
      const isSuccess = await loginStore.createUser(model)

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
    margin: 150px auto 0;
    max-width: 400px;
  }
}
</style>
