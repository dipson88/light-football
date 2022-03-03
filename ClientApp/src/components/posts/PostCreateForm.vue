<template>
  <form
    class="post-create-form"
    @submit.prevent
  >
    <NInput
      v-model:value="content"
      type="textarea"
      placeholder="Content"
      maxlength="1024"
      show-count
      clearable
      class="post-create-form__textarea"
    />
    <PostPrediction @prediction-change="onPredictionChange" />
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
import PostPrediction from './PostPrediction.vue'
import { MatchResultTypes, MatchTotalTypes, MatchTotalValueTypes } from '@/utils/enums'

export default defineComponent({
  name: 'PostCreateForm',
  components: {
    NButton,
    NInput,
    PostPrediction
  },
  emits: {
    submit: (model: {
      content: string,
      total: MatchTotalValueTypes,
      totalType: MatchTotalTypes,
      result: MatchResultTypes
    }) => model
  },
  setup (props, vm) {
    const { t } = useI18n()
    const content = ref('')
    const result = ref(MatchResultTypes.WinP1)
    const total = ref(MatchTotalValueTypes.HalfAndZero)
    const totalType = ref(MatchTotalTypes.Less)

    const onPredictionChange = (model: {
      total: MatchTotalValueTypes,
      totalType: MatchTotalTypes,
      result: MatchResultTypes
    }) => {
      total.value = model.total
      totalType.value = model.totalType
      result.value = model.result
    }

    const onSubmit = () => {
      vm.emit('submit', {
        content: content.value,
        total: total.value,
        totalType: totalType.value,
        result: result.value
      })
    }

    return { t, content, onPredictionChange, onSubmit }
  }
})
</script>

<style lang="scss">
.post-create-form {
  $spaces: 10px;

  padding: 20px;
  background-color: $color-brand-white;
  border: 1px solid $color-border;
  box-shadow: $box-shadow-from;

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
