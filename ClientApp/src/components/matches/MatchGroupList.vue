<template>
  <div class="match-group-list">
    <template v-if="groups.length">
      <MatchList
        v-for="group in groups"
        :key="group.header"
        :header-text="group.header"
        :matches="group.matches"
        @match-select="onMatchSelect"
      />
    </template>
    <div
      v-else
      class="match-group-list__no-data"
    >
      {{ t('no_data_to_display') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MatchList from './MatchList.vue'
import { MatchType } from '@/utils/types'
import { useI18n } from 'vue-i18n'

type MatchGroup = { header: string, matches: MatchType[] }

export default defineComponent({
  name: 'MatchGroupList',
  components: { MatchList },
  props: {
    groups: {
      type: Array as PropType<MatchGroup[]>,
      default: () => []
    }
  },
  emits: {
    'match-select': (id: number) => id
  },
  setup (props, vm) {
    const { t } = useI18n()

    const onMatchSelect = (id: number) => {
      vm.emit('match-select', id)
    }

    return {
      t,
      onMatchSelect
    }
  }
})
</script>

<style lang="scss">
.match-group-list {
  &__no-data {
    font-size: $font-size-x-small;
    text-align: center;
    margin-top: 5px;
  }
}
</style>
