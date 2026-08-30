<script setup lang="ts">
const {
  name,
  size = 'md',
} = defineProps<{
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}>()

const icon = defineAsyncComponent(() =>
  import(`~/assets/icons/${name}.svg`)
)
</script>

<template>
  <component
    :is="icon"
    aria-hidden="true"
    class="
      block shrink-0
      [stroke-width:var(--icon-stroke,2)]
      stroke-current
      text-current
      fill-none
    "
    :class="[
      size === 'xs' && 'size-4',
      size === 'sm' && 'size-4.5',
      size === 'md' && 'size-5',
      size === 'lg' && 'size-5.5',
      size === 'xl' && 'size-6',
      size === '2xl' && 'size-8',
    ]"
  />
</template>
