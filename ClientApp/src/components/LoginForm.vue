<template>
  <form
    class="login-form"
    @submit.prevent
  >
    <h2>
      {{ t('login') }}
    </h2>
    <article
      v-if="isErrorMessageExist"
      class="login-form__error"
    >
      {{ errorMessage }}
    </article>
    <section class="login-form__field">
      <label class="login-form__label">
        {{ t('email') }}
      </label>
      <NInput
        v-model:value="email"
        type="text"
        placeholder="Email"
        class="login-form__input"
      />
    </section>
    <section class="login-form__field">
      <label class="login-form__label">
        {{ t('password') }}
      </label>
      <NInput
        v-model:value="password"
        type="password"
        show-password-on="mousedown"
        placeholder="Password"
        class="login-form__input"
      />
    </section>
    <NButton
      type="primary"
      class="login-form__button"
      @click="onSubmit"
    >
      {{ t('login') }}
    </NButton>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { NButton, NInput } from 'naive-ui'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LoginForm',
  components: {
    NInput,
    NButton
  },
  props: {
    errorMessage: {
      type: String,
      default: ''
    }
  },
  emits: {
    submit: (model: { email: string, password: string }) => {
      return model
    }
  },
  setup (props, vm) {
    const { t } = useI18n()
    const email = ref('')
    const password = ref('')

    const isErrorMessageExist = computed(() => {
      return !!props.errorMessage.length
    })

    const onSubmit = () => {
      vm.emit('submit', { email: email.value, password: password.value })
    }

    return {
      t,
      email,
      password,
      isErrorMessageExist,
      onSubmit
    }
  }
})
</script>

<style lang="scss">
.login-form {
  padding: 20px;
  background-color: $color-brand-white;
  border: 1px solid $color-border;
  box-shadow: rgba(0 0 0 / 30%) 0 19px 38px, rgba(0 0 0 / 22%) 0 15px 12px;

  &__field + &__field {
    margin: 10px 0;
  }

  &__error {
    color: $color-brand-danger;
  }
}
</style>
