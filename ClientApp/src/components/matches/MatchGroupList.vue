<template>
  <div class="match-group-list">
    <template v-if="groups.length">
      <MatchList
        v-for="group in groups"
        :key="group.header"
        :header-text="group.header"
        :matches="group.matches"
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
  setup () {
    const { t } = useI18n()

    return { t }
  }
})
</script>

<style lang="scss">
.match-group-list {
  &__no-data {
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
  }
}
</style>
