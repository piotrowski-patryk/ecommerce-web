<script setup lang="ts">
import { tv } from 'tailwind-variants'

export interface SkeletonProps {
  as?: any
  ui?: {
    base?: any
  }
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  as: 'div',
})

defineSlots<{
  default(): any
}>()

const appConfig = useAppConfig()

const skeleton = tv({
  base: 'animate-pulse rounded-md bg-elevated',
  ...(appConfig?.ui as any)?.skeleton
})

const classes = computed(() =>
  skeleton({
    class: props.ui?.base,
  }),
)
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    :class="classes"
    role="status"
    aria-busy="true"
    aria-label="Loading…"
  >
    <slot />
  </component>
</template>