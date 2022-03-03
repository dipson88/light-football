<template>
  <header class="app-header">
    <router-link
      :to="toMainPageRoute"
      class="app-header__title"
    >
      The Light
    </router-link>
    <NButton
      v-if="isLoggedUser"
      text
      color="white"
      @click="logOut"
    >
      {{ t('log_out') }}
    </NButton>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routerHelper } from '@/utils'
import { NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppHeader',
  components: {
    NButton
  },
  props: {
    isLoggedUser: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    logout: (e: Event) => e
  },
  setup (props, vm) {
    const { t } = useI18n()

    const logOut = (e: Event) => {
      vm.emit('logout', e)
    }

    return {
      toMainPageRoute: {
        name: routerHelper.names.Home
      },
      t,
      logOut
    }
  }
})
</script>

<style lang="scss">
.app-header {
  z-index: $z-index-navbar;
  background-color: $color-header;
  height: $height-header;
  line-height: $height-header;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    color: $color-brand-white;
    font-weight: $font-weight-medium;
    font-size: 22px;
    text-decoration: none;
  }
}
</style>
