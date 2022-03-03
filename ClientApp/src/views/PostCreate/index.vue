<template>
  <section class="post-page">
    <PostCreateForm
      class="post-page__form"
      @submit="onSubmit"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostCreateForm from '@/components/posts/PostCreateForm.vue'
import { usePostStore } from '@/store/usePostStore'
import { useRouter } from 'vue-router'
import { routerHelper } from '@/utils'
import { MatchResultTypes, MatchTotalTypes, MatchTotalValueTypes } from '@/utils/enums'

export default defineComponent({
  name: 'PostCreate',
  components: {
    PostCreateForm
  },
  props: {
    matchId: {
      type: [String, Number],
      default: 0
    }
  },
  setup (props) {
    const postStore = usePostStore()
    const router = useRouter()

    const onSubmit = async (post: {
      content: string
      result: MatchResultTypes
      total: MatchTotalValueTypes
      totalType: MatchTotalTypes
    }) => {
      const isSuccess = await postStore.createPost({
        content: post.content,
        matchId: Number(props.matchId),
        result: post.result,
        total: post.total,
        totalType: post.totalType
      })

      if (isSuccess) {
        router.push({
          name: routerHelper.names.Match,
          params: { id: Number(props.matchId) }
        })
      }
    }

    return { onSubmit }
  }
})
</script>

<style lang="scss">
.post-page {
  &__form {
    max-width: $main-max-width;
    margin: $main-margin-top auto 0;
  }
}
</style>
