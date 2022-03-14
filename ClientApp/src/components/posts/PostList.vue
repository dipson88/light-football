<template>
  <section class="post-list">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :is-editable="post.userId === userId"
      :content="post.content"
      :result="post.result"
      :total-type="post.totalType"
      :total="post.total"
      :updated-at="post.updatedAt"
      :edit-callback="() => editCallback(post.id)"
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
    },
    userId: {
      type: String,
      default: ''
    },
    editCallback: {
      type: Function as PropType<(id: string) => void>,
      default: null
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
