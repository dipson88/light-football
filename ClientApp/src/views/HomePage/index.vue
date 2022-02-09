<template>
  <section class="home-page">
    <MatchList class="home-page__matches" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MatchList from '@/components/matches/MatchList.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    MatchList
  }
})
</script>

<style lang="scss">
.home-page {
  &__matches {
    max-width: 700px;
    margin: 0 auto;
  }
}
</style>
