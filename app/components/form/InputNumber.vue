<script setup lang="ts">
import { tv } from 'tailwind-variants'

export interface InputNumberProps {
  modelValue?: number | null

  min?: number
  max?: number
  step?: number

  disabled?: boolean
  readonly?: boolean

  placeholder?: string

  size?: 'sm' | 'md' | 'lg'

  ui?: {
    root?: string
    input?: string
    increment?: string
    decrement?: string
  }
}

const props = withDefaults(
  defineProps<InputNumberProps>(),
  {
    step: 1,
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const inputValue = computed(() =>
  props.modelValue ?? '',
)

function updateValue(value: number | null) {
  if (value === null) {
    emit('update:modelValue', null)
    return
  }

  let next = value

  if (props.min !== undefined) {
    next = Math.max(next, props.min)
  }

  if (props.max !== undefined) {
    next = Math.min(next, props.max)
  }

  emit('update:modelValue', next)
}

function increment() {
  const current = props.modelValue ?? 0

  updateValue(current + props.step)
}

function decrement() {
  const current = props.modelValue ?? 0

  updateValue(current - props.step)
}

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (value === '') {
    emit('update:modelValue', null)
    return
  }

  updateValue(Number(value))
}


const styles = tv({
  slots: {
    root: [
      'inline-flex',
      'items-center',
      'rounded-md',
      'border',
      'border-default',
      'bg-background',
      'overflow-hidden',
    ],

    input: [
      'w-full',
      'bg-transparent',
      'text-center',
      'outline-none',
      'disabled:cursor-not-allowed',
    ],

    button: [
      'flex',
      'items-center',
      'justify-center',
      'transition-colors',
      'hover:bg-muted',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
    ],
  },

  variants: {
    size: {
      sm: {
        input: 'h-8 text-sm',
        button: 'size-8',
      },

      md: {
        input: 'h-10',
        button: 'size-10',
      },

      lg: {
        input: 'h-12 text-lg',
        button: 'size-12',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})


const ui = styles({
  size: props.size,
})
</script>


<template>
  <div
    v-bind="$attrs"
    :class="[ui.root(), props.ui?.root]"
  >
    <button
      type="button"
      :class="[ui.button(), props.ui?.decrement]"
      :disabled="disabled || readonly || modelValue === min"
      aria-label="Decrease value"
      @click="decrement"
    >
      −
    </button>

    <input
      type="number"
      :value="inputValue"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="[ui.input(), props.ui?.input]"
      @input="onInput"
    />

    <button
      type="button"
      :class="[ui.button(), props.ui?.increment]"
      :disabled="disabled || readonly || modelValue === max"
      aria-label="Increase value"
      @click="increment"
    >
      +
    </button>
  </div>
</template>