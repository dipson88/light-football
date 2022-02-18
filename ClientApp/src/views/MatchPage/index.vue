<template>
  <section class="match-page">
    <MatchPageInfo
      :match-info="matchInfo"
      class="match-page__info"
    />
    <section class="match-page__posts">
      <h3 class="match-page__posts-header">
        {{ t('predicitions') }}
      </h3>
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
import { useI18n } from 'vue-i18n'

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
    const { t } = useI18n()
    const matchStore = useMatchesStore()
    const postStore = usePostStore()
    const { matchInfo } = storeToRefs(matchStore)
    const { posts } = storeToRefs(postStore)

    await Promise.all([
      matchStore.getMatchInfoById(+props.id),
      postStore.getPostsByMatchId(+props.id)
    ])

    return {
      t,
      matchInfo,
      posts
    }
  }
})
</script>

<style lang="scss">
.match-page {
  &__info,
  &__posts {
    max-width: 700px;
    background-color: darken($color-brand-white, 5%);
    box-sizing: border-box;
  }

  &__info {
    margin: 5% auto 0;
    min-height: 150px;
  }

  &__posts {
    margin: 0 auto;
    padding: 0 15px 10px;
  }

  &__posts-header {
    margin-bottom: 15px;
  }
}
</style>
