<script setup lang="ts">
import type { StepperItem, StepperItemStatus } from './types'

const props = defineProps<{
  item: StepperItem
  index: number
  status: StepperItemStatus
  clickable: boolean
}>()

const emit = defineEmits<{
  (e: 'select', index: number): void
}>()

const iconClass = computed<string>(() => {
  if (props.status === 'active') return 'bg-primary border-primary text-primary-foreground'
  if (props.status === 'completed') return 'bg-primary-soft border-primary text-primary'
  return 'bg-surface border-border text-muted-foreground'
})

function handleSelect() {
  if (props.clickable) emit('select', props.index)
}
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    :type="clickable ? 'button' : undefined"
    class="flex min-w-0 items-center gap-2 text-left md:gap-3"
    :class="clickable ? 'cursor-pointer' : 'cursor-default'"
    :aria-current="status === 'active' ? 'step' : undefined"
    @click="handleSelect"
  >
    <span
      aria-hidden="true"
      class="flex size-10 shrink-0 items-center justify-center rounded-md border-2 transition-colors md:size-12"
      :class="iconClass"
    >
      <Icon :name="item.icon" class="size-4 md:size-5" />
    </span>

    <!--
      sr-only → position:absolute, element wypada z flow fleksa i nie generuje gap.
      md:not-sr-only przywraca normalny layout od breakpointu md wzwyż.
    -->
    <span class="sr-only min-w-0 flex flex-col gap-0.5 wrap-break-words md:not-sr-only">
      <strong class="text-sm font-medium leading-tight">
        {{ item.title }}
      </strong>
      <span
        v-if="item.description"
        class="text-xs leading-tight text-muted-foreground"
      >
        {{ item.description }}
      </span>
    </span>
  </component>
</template>