<template>
  <section class="match-page">
    <MatchPageInfo />
    <section class="match-page__posts">
      <PostList
        :posts="posts"
        class="match-page__posts-list"
      />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MatchPageInfo from './MatchPageInfo.vue'
import PostList from '@/components/posts/PostList.vue'

import { useMatchesStore } from '@/store/useMatchesStore'
import { usePostStore } from '@/store/usePostStore'
import { storeToRefs } from 'pinia'

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
  },
  async setup (props) {
    const matchStore = useMatchesStore()
    const postStore = usePostStore()
    const { matchInfo } = storeToRefs(matchStore)
    const { posts } = storeToRefs(postStore)

    await Promise.all([
      matchStore.getMatchInfoById(+props.id),
      postStore.getPostsByMatchId(+props.id)
    ])

    return {
      matchInfo,
      posts
    }
  }
})
</script>
