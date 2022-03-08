<template>
  <section class="post-edit">
    <PostCreateForm
      :content="postData?.content"
      :result="postData?.result"
      :total="postData?.total"
      :total-type="postData?.totalType"
      is-edit-mode
      class="post-edit__form"
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
  name: 'PostEdit',
  components: {
    PostCreateForm
  },
  props: {
    postId: {
      type: [String, Number],
      default: 0
    }
  },
  async setup (props) {
    const postStore = usePostStore()
    const router = useRouter()

    await postStore.getPostById(props.postId.toString())
    const postData = postStore.post

    const onSubmit = async (post: {
      content: string
      result: MatchResultTypes
      total: MatchTotalValueTypes
      totalType: MatchTotalTypes
    }) => {
      const isSuccess = await postStore.editPost({
        content: post.content,
        matchId: postData ? postData.matchId : 0,
        result: post.result,
        total: post.total,
        totalType: post.totalType
      })

      if (isSuccess) {
        router.push({
          name: routerHelper.names.Match,
          params: { id: postData ? postData.matchId : 0 }
        })
      }
    }

    return { onSubmit, postData }
  }
})
</script>

<style lang="scss">
.post-edit {
  &__form {
    max-width: $main-max-width;
    margin: $main-margin-top auto 0;
  }
}
</style>
