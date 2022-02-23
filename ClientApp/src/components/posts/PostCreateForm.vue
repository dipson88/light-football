<template>
  <form
    class="post-create-form"
    @submit.prevent
  >
    <NInput
      v-model:value="title"
      type="text"
      placeholder="Title"
      maxlength="30"
      show-count
      clearable
      class="post-create-form__input"
    />
    <NInput
      v-model:value="content"
      type="textarea"
      placeholder="Content"
      maxlength="250"
      show-count
      clearable
      class="post-create-form__textarea"
    />
    <div class="post-create-form__buttons">
      <NButton
        type="primary"
        class="post-create-form__button"
        @click="onSubmit"
      >
        {{ t('create') }}
      </NButton>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NButton, NInput } from 'naive-ui'

export default defineComponent({
  name: 'PostCreateForm',
  components: {
    NButton,
    NInput
  },
  emits: {
    submit: (model: { content: string, title: string }) => model
  },
  setup (props, vm) {
    const { t } = useI18n()
    const content = ref('')
    const title = ref('')

    const onSubmit = () => {
      vm.emit('submit', {
        content: content.value,
        title: title.value
      })
    }

    return { t, content, title, onSubmit }
  }
})
</script>

<style lang="scss">
.post-create-form {
  $spaces: 10px;

  &__textarea {
    margin-top: $spaces;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: $spaces;
  }
}
</style>
