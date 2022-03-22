<template>
  <header class="app-header">
    <router-link
      :to="toMainPageRoute"
      class="app-header__title"
    >
      The Light
    </router-link>
    <div class="app-header__actions">
      <NDropdown
        :options="localeOptions"
        trigger="click"
        show-arrow
        @select="onSelectLocale"
      >
        <NButton
          text
          color="white"
        >
          {{ selectedLocale }}
        </NButton>
      </NDropdown>
      <NButton
        v-if="isLoggedUser"
        text
        color="white"
        @click="logOut"
      >
        {{ t('log_out') }}
      </NButton>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { routerHelper, enums } from '@/utils'
import { NButton, NDropdown } from 'naive-ui'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppHeader',
  components: {
    NButton,
    NDropdown
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
    const { Locales } = enums
    const { t, locale } = useI18n()
    const localeOptions = [
      {
        label: 'English',
        key: Locales.EN
      },
      {
        label: 'Русский',
        key: Locales.RU
      }
    ]

    const selectedLocale = computed(() => {
      return locale.value.toUpperCase()
    })

    const onSelectLocale = (key: string) => {
      if (locale.value !== key) {
        locale.value = key
      }
    }

    const logOut = (e: Event) => {
      vm.emit('logout', e)
    }

    return {
      t,
      selectedLocale,
      localeOptions,
      toMainPageRoute: {
        name: routerHelper.names.Home
      },
      onSelectLocale,
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
  padding: 0 20px;
  box-sizing: border-box;
  max-width: 100%;
  position: fixed;
  width: 100vw;
  top: 0;

  &__title {
    color: $color-brand-white;
    font-weight: $font-weight-medium;
    font-size: 22px;
    text-decoration: none;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
