<template>
  <form
    class="post-create-form"
    @submit.prevent
  >
    <NInput
      v-model:value="contentInput"
      :status="v$.$error ? 'error' : undefined"
      type="textarea"
      placeholder="Content"
      maxlength="1024"
      show-count
      clearable
      class="post-create-form__textarea"
    />
    <PostPrediction
      :result="resultInput"
      :total="totalInput"
      :total-type="totalTypeInput"
      @prediction-change="onPredictionChange"
    />
    <div class="post-create-form__buttons">
      <NButton
        v-if="isEditMode"
        class="post-create-form__button"
        @click="onReset"
      >
        {{ t('reset') }}
      </NButton>
      <NButton
        :disabled="v$.$error"
        type="primary"
        class="post-create-form__button"
        @click="onSubmit"
      >
        {{ t('save') }}
      </NButton>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
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
  props: {
    content: {
      type: String,
      default: ''
    },
    result: {
      type: Number as PropType<MatchResultTypes>,
      default: MatchResultTypes.WinP1
    },
    total: {
      type: Number as PropType<MatchTotalValueTypes>,
      default: MatchTotalValueTypes.HalfAndZero
    },
    totalType: {
      type: Number as PropType<MatchTotalTypes>,
      default: MatchTotalTypes.Less
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
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
    const contentInput = ref(props.content)
    const resultInput = ref(props.result)
    const totalInput = ref(props.total)
    const totalTypeInput = ref(props.totalType)
    const v$ = useVuelidate({ required }, contentInput)

    const onPredictionChange = (model: {
      total: MatchTotalValueTypes,
      totalType: MatchTotalTypes,
      result: MatchResultTypes
    }) => {
      totalInput.value = model.total
      totalTypeInput.value = model.totalType
      resultInput.value = model.result
    }

    const onSubmit = () => {
      v$.value.$touch()

      if (!v$.value.$invalid) {
        vm.emit('submit', {
          content: contentInput.value,
          total: totalInput.value,
          totalType: totalTypeInput.value,
          result: resultInput.value
        })
      }
    }

    const onReset = () => {
      contentInput.value = props.content
      resultInput.value = props.result
      totalInput.value = props.total
      totalTypeInput.value = props.totalType
    }

    return {
      t,
      contentInput,
      resultInput,
      totalInput,
      totalTypeInput,
      v$,
      onPredictionChange,
      onSubmit,
      onReset
    }
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
    gap: 10px;
  }
}
</style>
