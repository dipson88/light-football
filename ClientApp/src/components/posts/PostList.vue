<template>
  <section class="post-list">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :content="post.content"
      :created-at="post.createdAt"
      :updated-at="post.updatedAt"
    />
  </section>
</template>

<script lang="ts">
import { PostType } from '@/utils/types'
import { defineComponent, PropType } from 'vue'
import PostItem from './PostItem.vue'

export default defineComponent({
  name: 'PostList',
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array as PropType<PostType[]>,
      default: () => []
    }
  }
})
</script>
