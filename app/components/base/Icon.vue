<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps<{
  name: string
}>()

const icon = defineAsyncComponent(() =>
  import(`~/assets/icons/${props.name}.svg`)
)
</script>

<template>
  <component
    :is="icon"
    class="
      block
      size-(--icon-size,1.5rem)
      [stroke-width:var(--icon-stroke,2)]
      stroke-current
      text-current
      fill-none
    "
  />
</template>