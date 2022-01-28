<template>
  <button
    type="button"
    @click="count++"
  >
    count is: {{ count }}
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup () {
    const count = ref(0)

    return {
      count
    }
  }
})
</script>

<style lang="scss">
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
