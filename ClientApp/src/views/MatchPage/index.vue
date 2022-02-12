<template>
  <section class="match-page">
    TODO Match page {{ +id }}
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MatchPage',
  props: {
    id: {
      type: [String, Number],
      default: 0
    }
  }
})
</script>
