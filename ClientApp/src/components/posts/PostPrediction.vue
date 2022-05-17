<template>
  <div class="post-prediction">
    <div
      v-for="group in groups"
      :key="group.titleTKey"
    >
      <h4 class="post-prediction__title">
        {{ t(group.titleTKey) }}
      </h4>
      <NRadioGroup
        v-model:value="group.value"
        :name="`radiobuttongroup-${group.titleTKey}`"
      >
        <NRadio
          v-for="option in group.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.skipTranslate ? option.labelTKey : t(option.labelTKey) }}
        </NRadio>
      </NRadioGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, computed } from 'vue'
import { NRadioGroup, NRadio } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import {
  MatchResultTypes,
  MatchTotalTypes,
  MatchTotalValueTypes
} from '@/utils/enums'

interface IGroup<T> {
  titleTKey: string
  options: {
    labelTKey: string,
    skipTranslate?: boolean
    value: T
  }[]
  value: T
}

type Group = [
  IGroup<MatchResultTypes>,
  IGroup<MatchTotalTypes>,
  IGroup<MatchTotalValueTypes>
]

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
    const propValues = computed(() => [props.result, props.totalType, props.total])
    const groups = reactive<Group>([
      {
        titleTKey: 'result',
        options: [
          {
            labelTKey: 'w1',
            value: MatchResultTypes.WinP1
          },
          {
            labelTKey: 'x',
            value: MatchResultTypes.Draw
          },
          {
            labelTKey: 'w2',
            value: MatchResultTypes.WinP2
          }
        ],
        value: props.result
      },
      {
        titleTKey: 'total_type',
        options: [
          {
            labelTKey: 'less',
            value: MatchTotalTypes.Less
          },
          {
            labelTKey: 'more',
            value: MatchTotalTypes.More
          }
        ],
        value: props.totalType
      },
      {
        titleTKey: 'total',
        options: [
          {
            labelTKey: '0.5',
            value: MatchTotalValueTypes.HalfAndZero,
            skipTranslate: true
          },
          {
            labelTKey: '1.5',
            value: MatchTotalValueTypes.HalfAndOne,
            skipTranslate: true
          },
          {
            labelTKey: '2.5',
            value: MatchTotalValueTypes.HalfAndTwo,
            skipTranslate: true
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

    watch(propValues, (newValues) => {
      groups.forEach((group, index) => {
        group.value = newValues[index]
      })
    })

    return {
      t,
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
