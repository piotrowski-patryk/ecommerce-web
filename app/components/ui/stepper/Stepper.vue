<script setup lang="ts">
import type { StepperItem, StepperItemStatus } from './types'

const props = defineProps<{
  items: StepperItem[]
  clickableCompleted?: boolean
  clickablePending?: boolean
}>()

const activeIndex = ref(0)

const activeStep = computed(() => props.items[activeIndex.value])

function getStatus(index: number): StepperItemStatus {
  if (index < activeIndex.value) return 'completed'
  if (index === activeIndex.value) return 'active'
  return 'pending'
}

function isClickable(index: number): boolean {
  const status = getStatus(index)
  if (status === 'completed') return props.clickableCompleted ?? false
  if (status === 'pending') return props.clickablePending ?? false
  return false
}

function next() {
  if (activeIndex.value < props.items.length - 1) activeIndex.value++
}

function previous() {
  if (activeIndex.value > 0) activeIndex.value--
}

// Pełne literały są wymagane — Tailwind JIT nie wykrywa klas budowanych dynamicznie
const CONNECTOR_COMPLETED = "after:content-[''] after:block after:flex-1 after:h-0.5 after:mx-1 after:transition-colors after:bg-primary md:after:mx-3"
const CONNECTOR_DEFAULT   = "after:content-[''] after:block after:flex-1 after:h-0.5 after:mx-1 after:transition-colors after:bg-border md:after:mx-3"

function connectorClass(index: number): string {
  if (index >= props.items.length - 1) return ''
  return getStatus(index) === 'completed' ? CONNECTOR_COMPLETED : CONNECTOR_DEFAULT
}
</script>

<template>
  <div class="flex w-full flex-col gap-8">
    <ol class="flex w-full items-center">
      <li
        v-for="(item, index) in items"
        :key="item.slot"
        class="flex items-center"
        :class="[
          index < items.length - 1 ? 'flex-1' : 'shrink-0',
          connectorClass(index),
        ]"
      >
        <StepperItem
          :item="item"
          :index="index"
          :status="getStatus(index)"
          :clickable="isClickable(index)"
          @select="activeIndex = $event"
        />
      </li>
    </ol>

    <template v-for="item in items" :key="item.slot">
      <div v-show="activeStep?.slot === item.slot">
        <slot
          :name="item.slot"
          :next="next"
          :previous="previous"
          :active-step="activeStep"
        />
      </div>
    </template>
  </div>
</template>