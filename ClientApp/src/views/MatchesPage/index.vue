<template>
  <section class="matches-page">
    <div class="matches-page__competition">
      <h2>{{ competitionHeader }}</h2>
      <MatchesControls
        :selected-type="selectedType"
        @select-type="onSelectType"
      />
    </div>
    <MatchGroupList
      :groups="groups"
      class="matches-page__matches"
      @match-select="onMatchSelect"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import MatchGroupList from '@/components/matches/MatchGroupList.vue'
import MatchesControls from './MatchesControls.vue'

import { useMatchesStore } from '@/store/useMatchesStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { MatchType } from '@/utils/types'
import { routerHelper } from '@/utils'
import i18n from '@/locale'
import { MatchSatusFilterTypes } from '@/utils/enums'

const { t } = i18n.global
const mapGroups = (match: MatchType[]) => {
  return match.reduce((acc, curr) => {
    const group = acc.find(item => item.key === curr.matchday)

    if (group) {
      group.matches.push(curr)
    } else {
      acc.push({
        key: curr.matchday,
        header: t('round', { number: curr.matchday }),
        matches: [curr]
      })
    }

    return acc
  }, [] as { key: string, header: string, matches: MatchType[] }[])
}

export default defineComponent({
  name: 'MatchesPage',
  components: {
    MatchGroupList,
    MatchesControls
  },
  async setup () {
    const router = useRouter()
    const matchesStore = useMatchesStore()
    const { matches, competition } = storeToRefs(matchesStore)
    const selectedType = ref(MatchSatusFilterTypes.CURRENT)
    await matchesStore.getMatches(selectedType.value)

    const groups = computed(() => {
      return mapGroups(matches.value)
    })

    const onSelectType = async (type: MatchSatusFilterTypes) => {
      selectedType.value = type
      await matchesStore.getMatches(selectedType.value)
    }
    const onMatchSelect = (id: number) => {
      router.push({
        name: routerHelper.names.Match,
        params: { id }
      })
    }

    return {
      competitionHeader: competition.value?.name,
      groups,
      selectedType,
      onSelectType,
      onMatchSelect
    }
  }
})
</script>

<style lang="scss">
.matches-page {
  &__competition,
  &__matches {
    max-width: $main-max-width;
  }

  &__competition {
    margin: $main-margin-top auto 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__matches {
    margin: 0 auto;
  }
}
</style>
