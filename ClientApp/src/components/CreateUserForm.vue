<template>
  <form
    class="create-user-form"
    @submit.prevent
  >
    <h2>
      {{ t('sign_up') }}
    </h2>
    <article
      v-if="isErrorMessageExist"
      class="login-form__error"
    >
      {{ errorMessage }}
    </article>
    <section
      v-for="field in fields"
      :key="field.label"
      class="create-user-form__field"
    >
      <label class="create-user-form__label">
        {{ field.label }}
      </label>
      <NInput
        v-model:value="field.value"
        :type="field.isPassword ? 'password' : 'text'"
        :placeholder="field.label"
        :status="field.validation.$error ? 'error' : undefined"
        show-password-on="mousedown"
        class="create-user-form__input"
        @input="field.onInput"
      />
      <p
        v-if="field.validation.$error"
        class="create-user-form__error"
      >
        {{ field.validation.$errors[0].$message }}
      </p>
    </section>
    <NButton
      :disabled="v$.$error"
      type="primary"
      class="create-user-form__button"
      @click="onSubmit"
    >
      {{ t('sign_up') }}
    </NButton>
    <NButton
      text
      type="info"
      class="create-user-form__link"
      @click="onLogin"
    >
      {{ t('sign_in') }}
    </NButton>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { required, email, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { NButton, NInput } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { LoginUserInputType } from '@/utils/types'

const lengthValidation = (value: string, min: number, max: number) => {
  return value.length <= max && value.length >= min
}
const maxLength = 40
const minLength = 0
const minPasswordLength = 8

export default defineComponent({
  name: 'CreateUserForm',
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
    submit: (model: LoginUserInputType) => model,
    login: (e: Event) => e
  },
  setup (props, vm) {
    const { t } = useI18n()

    const isErrorMessageExist = computed(() => {
      return !!props.errorMessage.length
    })

    const state = reactive({
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    })
    const requiredValidation = helpers.withMessage(t('this_field_is_required'), required)
    const validationRules = {
      name: {
        required: requiredValidation,
        lenght: helpers.withMessage(
          t('length_should_be_less_than', { length: maxLength }),
          (value: string) => lengthValidation(value, minLength, maxLength)
        )
      },
      email: {
        required: requiredValidation,
        lenght: helpers.withMessage(
          t('length_should_be_less_than', { length: maxLength }),
          (value: string) => lengthValidation(value, minLength, maxLength)
        ),
        email: helpers.withMessage(t('email_is_not_valid'), email)
      },
      password: {
        required: requiredValidation,
        lenght: helpers.withMessage(
          t('length_should_be_beteween', { min: minPasswordLength, max: maxLength }),
          (value: string) => lengthValidation(value, minPasswordLength, maxLength)
        )
      },
      repeatPassword: {
        required: requiredValidation,
        theSame: helpers.withMessage(
          t('passwords_are_not_the_same'),
          (value: string) => value === state.password
        )
      }
    }
    const v$ = useVuelidate(validationRules, state)

    const fields = reactive([
      {
        isPassword: false,
        label: t('name'),
        value: state.name,
        onInput: (value: string) => {
          state.name = value
        },
        validation: v$.value.name
      },
      {
        isPassword: false,
        label: t('email'),
        value: state.email,
        onInput: (value: string) => {
          state.email = value
        },
        validation: v$.value.email
      },
      {
        isPassword: true,
        label: t('password'),
        value: state.password,
        onInput: (value: string) => {
          state.password = value
        },
        validation: v$.value.password
      },
      {
        isPassword: true,
        label: t('confirm_password'),
        value: state.repeatPassword,
        onInput: (value: string) => {
          state.repeatPassword = value
        },
        validation: v$.value.repeatPassword
      }
    ])

    const onSubmit = () => {
      v$.value.$touch()

      if (!v$.value.$error) {
        vm.emit('submit', state)
      }
    }

    const onLogin = (e: Event) => {
      vm.emit('login', e)
    }

    return {
      t,
      isErrorMessageExist,
      v$,
      fields,
      onSubmit,
      onLogin
    }
  }
})
</script>

<style lang="scss">
.create-user-form {
  padding: 20px;
  background-color: $color-brand-white;
  border: 1px solid $color-border;
  box-shadow: $box-shadow-from;

  &__field + &__field {
    margin-top: 10px;
  }

  &__error {
    color: $color-brand-danger;
    font-size: 12px;
    margin: 0;
  }

  &__button {
    margin-top: 10px;
  }

  &__link {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
