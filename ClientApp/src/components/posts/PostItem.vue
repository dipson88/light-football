<template>
  <section class="post-item">
    <h3>
      {{ title }}
    </h3>
    <div>
      {{ content }}
    </div>
    <p>
      {{ createdAt }} - {{ updatedAt }}
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: null
    },
    updatedAt: {
      type: Date,
      default: null
    }
  }
})
</script>
