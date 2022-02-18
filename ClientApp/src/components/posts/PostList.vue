<template>
  <section class="post-list">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :content="post.content"
      :updated-at="post.updatedAt"
      class="post-list__item"
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

<style lang="scss">
.post-list {
  &__item + &__item {
    margin-top: 25px;
  }
}
</style>
