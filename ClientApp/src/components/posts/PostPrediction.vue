<template>
  <div class="post-prediction">
    <div
      v-for="group in groups"
      :key="group.title"
    >
      <h4 class="post-prediction__title">
        {{ group.title }}
      </h4>
      <NRadioGroup
        v-model:value="group.value"
        :name="`radiobuttongroup-${group.title}`"
      >
        <NRadio
          v-for="option in group.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </NRadio>
      </NRadioGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from 'vue'
import { NRadioGroup, NRadio } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import {
  MatchResultTypes,
  MatchTotalTypes,
  MatchTotalValueTypes
} from '@/utils/enums'

export default defineComponent({
  name: 'PostPrediction',
  components: {
    NRadioGroup,
    NRadio
  },
  props: {
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
    }
  },
  emits: {
    'prediction-change': (model: {
      total: MatchTotalValueTypes,
      totalType: MatchTotalTypes,
      result: MatchResultTypes
    }) => model
  },
  setup (props, vm) {
    const { t } = useI18n()
    const groups = reactive([
      {
        title: t('result'),
        options: [
          {
            label: t('w1'),
            value: MatchResultTypes.WinP1
          },
          {
            label: t('x'),
            value: MatchResultTypes.Draw
          },
          {
            label: t('w2'),
            value: MatchResultTypes.WinP2
          }
        ],
        value: props.result
      },
      {
        title: t('total_type'),
        options: [
          {
            label: t('less'),
            value: MatchTotalTypes.Less
          },
          {
            label: t('more'),
            value: MatchTotalTypes.More
          }
        ],
        value: props.totalType
      },
      {
        title: t('total'),
        options: [
          {
            label: '0.5',
            value: MatchTotalValueTypes.HalfAndZero
          },
          {
            label: '1.5',
            value: MatchTotalValueTypes.HalfAndOne
          },
          {
            label: '2.5',
            value: MatchTotalValueTypes.HalfAndTwo
          }
        ],
        value: props.total
      }
    ])

    watch(groups, (newValue) => {
      const [result, totalType, total] = newValue.map(item => item.value) as [MatchResultTypes, MatchTotalTypes, MatchTotalValueTypes]
      vm.emit('prediction-change', {
        result,
        totalType,
        total
      })
    })

    return {
      groups
    }
  }
})
</script>

<style lang="scss">
.post-prediction {
  display: block;

  &__title {
    margin: 10px 0 5px;
  }
}
</style>
