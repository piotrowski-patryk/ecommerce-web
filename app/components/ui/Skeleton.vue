<script setup lang="ts">
interface Skeleton {
  as?: string
}

const props = withDefaults(defineProps<Skeleton>(), {
  as: 'div',
})

const { t } = useI18n()
</script>

<template>
  <component
    :is="props.as"
    class="animate-pulse rounded-md bg-elevated"
    role="status"
    aria-busy="true"
    :aria-label="t('common.loading')"
  >
    <slot />
  </component>
</template>