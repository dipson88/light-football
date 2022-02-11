<template>
  <section class="matches-controls">
    <NRadioGroup
      v-model:value="value"
      name="radiobuttongroup1"
    >
      <NRadio
        v-for="btn in buttons"
        :key="btn.value"
        :value="btn.value"
      >
        {{ btn.label }}
      </NRadio>
    </NRadioGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { NRadioGroup, NRadio } from 'naive-ui'
import { MatchSatusFilterTypes } from '@/utils/enums'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MatchesControls',
  components: {
    NRadioGroup,
    NRadio
  },
  props: {
    selectedType: {
      type: Number as PropType<MatchSatusFilterTypes>,
      default: MatchSatusFilterTypes.CURRENT
    }
  },
  emits: {
    'select-type': (value: MatchSatusFilterTypes) => value
  },
  setup (props, vm) {
    const { t } = useI18n()
    const buttons = [
      {
        value: MatchSatusFilterTypes.CURRENT,
        label: t('current')
      },
      {
        value: MatchSatusFilterTypes.UPCOMING,
        label: t('upcoming')
      },
      {
        value: MatchSatusFilterTypes.FINISHED,
        label: t('finished')
      }
    ]
    const value = ref(props.selectedType)

    watch(value, (newValue) => {
      vm.emit('select-type', newValue)
    })

    return {
      buttons,
      value
    }
  }
})
</script>
