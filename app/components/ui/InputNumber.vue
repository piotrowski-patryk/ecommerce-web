<script setup lang="ts">
interface Props {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  step: 1,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const { t } = useI18n()

function decrement() {
  const value = props.modelValue - props.step

  if (props.min !== undefined && value < props.min) {
    return
  }

  emit('update:modelValue', value)
}

function increment() {
  const value = props.modelValue + props.step

  if (props.max !== undefined && value > props.max) {
    return
  }

  emit('update:modelValue', value)
}
</script>

<template>
  <div 
    class="flex items-center rounded-md border border-muted px-2"
    :class="{
      'h-8': size === 'sm',
      'h-10': size === 'md',
      'h-12': size === 'lg',
    }"
  >
    <button
      type="button"
      class="flex cursor-pointer items-center justify-center text-primary disabled:cursor-not-allowed disabled:opacity-50"
      :class="{
        'size-7': size === 'sm',
        'size-8': size === 'md',
        'size-10': size === 'lg',
      }"
      :disabled="disabled || (min !== undefined && modelValue <= min)"
      :aria-label="t('common.decrease', 'Decrease value')"
      @click="decrement"
    >
      <Icon 
        name="minus" 
        :class="{
          'size-4': size === 'sm',
          'size-5': size === 'md',
          'size-6': size === 'lg',
        }" 
      />
    </button>

    <output
      class="flex-1 text-center tabular-nums"
      :class="{
        'min-w-7 text-xs': size === 'sm',
        'min-w-8 text-sm': size === 'md',
        'min-w-10 text-base': size === 'lg',
      }"
      aria-live="polite"
    >
      {{ modelValue }}
    </output>

    <button
      type="button"
      class="flex cursor-pointer items-center justify-center text-primary disabled:cursor-not-allowed disabled:opacity-50"
      :class="{
        'size-7': size === 'sm',
        'size-8': size === 'md',
        'size-10': size === 'lg',
      }"
      :disabled="disabled || (max !== undefined && modelValue >= max)"
      :aria-label="t('common.increase', 'Increase value')"
      @click="increment"
    >
      <Icon 
        name="plus" 
        :class="{
          'size-4': size === 'sm',
          'size-5': size === 'md',
          'size-6': size === 'lg',
        }" 
      />
    </button>
  </div>
</template>