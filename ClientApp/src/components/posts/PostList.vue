<template>
  <section class="post-list">
    <PostItem />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostItem from './PostItem.vue'

export default defineComponent({
  name: 'PostItem',
  components: {
    PostItem
  }
})
</script>
