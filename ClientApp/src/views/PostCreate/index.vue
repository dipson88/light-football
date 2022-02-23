<template>
  <section class="post-page">
    <PostCreateForm @submit="onSubmit" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostCreateForm from '@/components/posts/PostCreateForm.vue'
import { usePostStore } from '@/store/usePostStore'
import { useRouter } from 'vue-router'
import { routerHelper } from '@/utils'

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

    const onSubmit = async ({
      title,
      content
    }: {
      title: string;
      content: string;
    }) => {
      const isSuccess = await postStore.createPost({
        title,
        content,
        matchId: Number(props.matchId)
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
  display: block;
}
</style>
