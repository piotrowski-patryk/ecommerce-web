<script setup lang="ts">
interface Skeleton {
  as?: string
}

const { as = 'div' } = defineProps<Skeleton>()
</script>

<template>
  <component
    :is="as"
    class="animate-pulse rounded-md bg-muted"
    role="status"
    aria-busy="true"
    :aria-label="$t('common.action.loading')"
  >
    <slot />
  </component>
</template>
