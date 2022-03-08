<template>
  <section class="post-item">
    <h3 class="post-item__title">
      {{ formattedTitle }}
    </h3>
    <div class="post-item__content">
      {{ content }}
    </div>
    <p class="post-item__additionals">
      <NButton
        v-if="isEditable"
        text
        type="info"
        class="post-item__edit"
        @click="onEditClick"
      >
        {{ t('edit') }}
      </NButton>
      {{ t('updated', { date:formattedUpdateDate }) }}
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { NButton } from 'naive-ui'
import { dateFormatters, postHelper } from '@/utils'
import { useI18n } from 'vue-i18n'
import {
  MatchResultTypes,
  MatchTotalTypes,
  MatchTotalValueTypes
} from '@/utils/enums'

export default defineComponent({
  name: 'PostItem',
  components: {
    NButton
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
    updatedAt: {
      type: Date,
      default: null
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    editCallback: {
      type: Function as PropType<() => void>,
      default: null
    }
  },
  emits: {
    edit: (id: string) => id
  },
  setup (props) {
    const { t } = useI18n()
    const formattedUpdateDate = computed(() => {
      return props.updatedAt
        ? dateFormatters.toLocaleDate(props.updatedAt.toString())
        : ''
    })

    const formattedTitle = computed(() => {
      const result = postHelper.resultTNames.get(props.result) ?? ''
      const totalType = postHelper.totalTypeTNames.get(props.totalType) ?? ''
      const total = postHelper.totalNames.get(props.total) ?? ''

      return t('result_total_type_more', {
        result: t(result),
        totalType: t(totalType),
        total
      })
    })

    const onEditClick = () => {
      if (props.editCallback) {
        props.editCallback()
      }
    }

    return {
      t,
      formattedUpdateDate,
      formattedTitle,
      onEditClick
    }
  }
})
</script>

<style lang="scss">
.post-item {
  font-size: $font-size-small;

  &__title {
    margin-bottom: 10px;
  }

  &__content {
    white-space: pre-wrap;
  }

  &__additionals {
    font-size: $font-size-x-small;
    text-align: right;
    margin: 15px 0 0;
    border-bottom: 1px solid $color-brand-gray-dark;
  }

  &__edit {
    font-size: $font-size-small;
  }
}
</style>
