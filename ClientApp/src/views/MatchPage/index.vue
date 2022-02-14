<template>
  <section class="match-page">
    <MatchPageInfo />
    <section class="match-page__posts">
      <PostList />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MatchPageInfo from './MatchPageInfo.vue'
import PostList from '@/components/posts/PostList.vue'

export default defineComponent({
  name: 'MatchPage',
  components: {
    MatchPageInfo,
    PostList
  },
  props: {
    id: {
      type: [String, Number],
      default: 0
    }
  }
})
</script>
