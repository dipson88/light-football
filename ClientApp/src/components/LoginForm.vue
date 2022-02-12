<template>
  <form
    class="login-form"
    @submit.prevent
  >
    <h2>
      {{ t('sign_in') }}
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
      {{ t('sign_in') }}
    </NButton>
    <NButton
      text
      type="info"
      class="login-form__link"
      @click="onCreate"
    >
      {{ t('sign_up') }}
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
    submit: (model: { email: string, password: string }) => model,
    create: (e: Event) => e
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
    const onCreate = (e: Event) => {
      vm.emit('create', e)
    }

    return {
      t,
      email,
      password,
      isErrorMessageExist,
      onSubmit,
      onCreate
    }
  }
})
</script>

<style lang="scss">
.login-form {
  padding: 20px;
  background-color: $color-brand-white;
  border: 1px solid $color-border;
  box-shadow: $box-shadow-from;

  &__field + &__field {
    margin: 10px 0;
  }

  &__error {
    color: $color-brand-danger;
    font-size: 12px;
  }

  &__link {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
