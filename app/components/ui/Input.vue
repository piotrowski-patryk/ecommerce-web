<script setup lang="ts">
interface Props {
  // INPUT
  type?: 'text' | 'number' | 'email' | 'tel'
  placeholder?: string
  autocomplete?: string

  // STYLE
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  // STATE
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  invalid?: boolean

  // NUMBER
  min?: number
  max?: number
  step?: number | 'any'
}

const {
  type = 'text',
  placeholder,
  autocomplete,
  color = 'primary',
  variant = 'outline',
  size = 'md',
  disabled,
  readonly,
  required,
  invalid,
  min,
  max,
  step,
} = defineProps<Props>()

const modelValue = defineModel<string | number>()
</script>

<template>
  <input
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :aria-invalid="invalid || undefined"
    :min="min"
    :max="max"
    :step="step"
    class="
      block w-full min-w-0 rounded-md border
      text-default placeholder:text-muted
      transition-colors
      disabled:cursor-not-allowed disabled:opacity-50
      read-only:cursor-default
    "
    :class="[
      // COLOR
      color === 'primary' && '[--input-color:var(--color-primary)]',
      color === 'secondary' && '[--input-color:var(--color-secondary)]',
      color === 'success' && '[--input-color:var(--color-success)]',
      color === 'info' && '[--input-color:var(--color-info)]',
      color === 'warning' && '[--input-color:var(--color-warning)]',
      color === 'error' && '[--input-color:var(--color-error)]',
      color === 'neutral' && '[--input-color:var(--border-color-strong)]',
      invalid && '[--input-color:var(--color-error)]',

      // VARIANT
      variant === 'outline' && 'border-default bg-default',
      variant === 'soft' && 'border-transparent bg-(--input-color)/10',
      variant === 'subtle' && 'border-(--input-color)/20 bg-(--input-color)/5',
      variant === 'ghost' && 'border-transparent bg-transparent hover:bg-muted',
      variant === 'none' && 'border-transparent bg-transparent',
      variant !== 'none' && 'focus-visible:border-(--input-color) focus-visible:ring-2 focus-visible:ring-(--input-color)/20 focus-visible:outline-none',
      invalid && variant !== 'none' && 'border-(--input-color)',

      // SIZE
      size === 'xs' && 'h-7 px-2.5 text-sm/4 md:text-xs',
      size === 'sm' && 'h-8 px-3 text-base/5 md:text-sm',
      size === 'md' && 'h-9 px-3.5 text-base/5 md:text-sm',
      size === 'lg' && 'h-10 px-4 text-base',
      size === 'xl' && 'h-11 px-5 text-base',
    ]"
  >
</template>