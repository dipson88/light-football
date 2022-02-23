<template>
  <section class="match-page">
    <MatchPageInfo
      v-if="matchInfo"
      :match-info="matchInfo"
      class="match-page__info"
    />
    <section class="match-page__posts">
      <h3 class="match-page__posts-header">
        <span>
          {{ t('predicitions') }}
        </span>
        <NButton
          text
          type="info"
          class="match-page__create-button"
          @click="onCreateOwnPerdiciton"
        >
          {{ t('create_prediction') }}
        </NButton>
      </h3>
      <PostList
        v-if="posts.length"
        :posts="posts"
        class="match-page__posts-list"
      />
      <p
        v-else
        class="match-page__no-data"
      >
        {{ t('no_data_to_display') }}
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MatchPageInfo from './MatchPageInfo.vue'
import PostList from '@/components/posts/PostList.vue'
import { NButton } from 'naive-ui'

import { useMatchesStore } from '@/store/useMatchesStore'
import { usePostStore } from '@/store/usePostStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { routerHelper } from '@/utils'

export default defineComponent({
  name: 'MatchPage',
  components: {
    MatchPageInfo,
    PostList,
    NButton
  },
  props: {
    id: {
      type: [String, Number],
      default: 0
    }
  },
  async setup (props) {
    const { t } = useI18n()
    const router = useRouter()
    const matchStore = useMatchesStore()
    const postStore = usePostStore()
    const { matchInfo } = storeToRefs(matchStore)
    const { posts } = storeToRefs(postStore)

    await Promise.all([
      matchStore.getMatchInfoById(+props.id),
      postStore.getPostsByMatchId(+props.id)
    ])

    const onCreateOwnPerdiciton = () => {
      router.push({
        name: routerHelper.names.PostCreate,
        params: { matchId: props.id }
      })
    }

    return {
      t,
      matchInfo,
      posts,
      onCreateOwnPerdiciton
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
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__create-button {
    font-size: $font-size-small;
  }

  &__no-data {
    font-size: $font-size-x-small;
    text-align: center;
    margin-top: 5px;
  }
}
</style>
