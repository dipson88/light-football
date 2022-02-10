<template>
  <section class="home-page">
    <MatchList
      :header-text="competitionHeader"
      :matches="matches"
      class="home-page__matches"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MatchList from '@/components/matches/MatchList.vue'
import { useMatchesStore } from '@/store/useMatchesStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'HomePage',
  components: {
    MatchList
  },
  async setup () {
    const matchesStore = useMatchesStore()
    const { matches, competition } = storeToRefs(matchesStore)
    await matchesStore.getMatches()

    return {
      competitionHeader: competition.value?.name,
      matches
    }
  }
})
</script>

<style lang="scss">
.home-page {
  &__matches {
    max-width: 700px;
    margin: 40px auto 0;
  }
}
</style>
