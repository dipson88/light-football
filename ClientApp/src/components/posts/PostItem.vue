<template>
  <section class="post-item">
    <h3 class="post-item__title">
      {{ title }}
    </h3>
    <div class="post-item__content">
      {{ content }}
    </div>
    <p class="post-item__additionals">
      {{ t('updated', { date:formattedUpdateDate }) }}
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { dateFormatters } from '@/utils'
import { useI18n } from 'vue-i18n'

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
    updatedAt: {
      type: Date,
      default: null
    }
  },
  setup (props) {
    const { t } = useI18n()
    const formattedUpdateDate = computed(() => {
      return props.updatedAt
        ? dateFormatters.toLocaleDate(props.updatedAt.toString())
        : ''
    })

    return {
      t,
      formattedUpdateDate
    }
  }
})
</script>

<style lang="scss">
.post-item {
  font-size: $font-size-small;

  &__title {
    margin-bottom: 10px;
  }

  &__content {
    white-space: pre-wrap;
  }

  &__additionals {
    font-size: $font-size-x-small;
    text-align: right;
    margin: 15px 0 0;
    border-bottom: 1px solid $color-brand-gray-dark;
  }
}
</style>
