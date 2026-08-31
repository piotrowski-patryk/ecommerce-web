<script setup lang="ts">
interface Props {
  // BUTTON
  type?: 'button' | 'submit' | 'reset'

  // LINK
  to?: string | Record<string, unknown>

  // STATE
  disabled?: boolean
  loading?: boolean

  // CONTENT
  icon?: string
  label?: string

  // STYLE
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const {
  type = 'button',
  to,
  disabled,
  loading,
  icon,
  label,
  color = 'primary',
  variant = 'solid',
  weight = 'medium',
  size = 'md',
} = defineProps<Props>()

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale')

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <component
    :is="to ? NuxtLinkLocale : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="to ? undefined : disabled || loading"

    class="
      inline-flex cursor-pointer items-center justify-center
      rounded-md border
      whitespace-nowrap
      transition-colors
      disabled:cursor-not-allowed disabled:opacity-50
    "

    :class="[
      // COLOR
      color === 'primary' && '[--button-color:var(--color-primary)]',
      color === 'secondary' && '[--button-color:var(--color-secondary)]',
      color === 'success' && '[--button-color:var(--color-success)]',
      color === 'info' && '[--button-color:var(--color-info)]',
      color === 'warning' && '[--button-color:var(--color-warning)]',
      color === 'error' && '[--button-color:var(--color-error)]',

      // VARIANT
      color !== 'neutral' && variant === 'solid' && 'border-(--button-color) bg-(--button-color) text-inverted hover:bg-(--button-color)/80',
      color !== 'neutral' && variant === 'outline' && 'border-(--button-color) bg-transparent text-(--button-color) hover:bg-(--button-color)/20',
      color !== 'neutral' && variant === 'soft' && 'border-(--button-color)/20 bg-(--button-color)/10 text-(--button-color) hover:bg-(--button-color)/20',
      color !== 'neutral' && variant === 'subtle' && 'border-(--button-color)/20 bg-(--button-color)/5 text-(--button-color) hover:bg-(--button-color)/20',
      color !== 'neutral' && variant === 'ghost' && 'border-transparent bg-transparent text-(--button-color) hover:bg-(--button-color)/20',
      color !== 'neutral' && variant === 'link' && 'border-transparent bg-transparent text-(--button-color) underline-offset-4 hover:underline',

      color === 'neutral' && variant === 'solid' && 'border-inverted bg-inverted text-inverted hover:bg-inverted/90',
      color === 'neutral' && variant === 'outline' && 'border-strong bg-default text-default hover:bg-muted',
      color === 'neutral' && variant === 'soft' && 'border-transparent bg-muted text-default hover:bg-strong/75',
      color === 'neutral' && variant === 'subtle' && 'border-strong bg-muted text-default hover:bg-strong/75',
      color === 'neutral' && variant === 'ghost' && 'border-transparent bg-transparent text-default hover:bg-muted',
      color === 'neutral' && variant === 'link' && 'border-transparent bg-transparent text-muted underline-offset-4 hover:text-default hover:underline',

      // WEIGHT
      weight === 'normal' && 'font-normal',
      weight === 'medium' && 'font-medium',
      weight === 'semibold' && 'font-semibold',
      weight === 'bold' && 'font-bold',

      // SIZE
      size === 'xs' && 'h-7 gap-1 text-xs',
      size === 'sm' && 'h-8 gap-1.5 text-sm',
      size === 'md' && 'h-9 gap-1.5 text-sm',
      size === 'lg' && 'h-10 gap-2 text-base',
      size === 'xl' && 'h-11 gap-2.5 text-base',

      icon && !label && 'aspect-square p-0',
      (!icon || label) && size === 'xs' && 'px-2.5',
      (!icon || label) && size === 'sm' && 'px-3',
      (!icon || label) && size === 'md' && 'px-3.5',
      (!icon || label) && size === 'lg' && 'px-4',
      (!icon || label) && size === 'xl' && 'px-5',
    ]"

    @click="emit('click', $event)"
  >
    <Spinner
      v-if="loading"
      :size="size"
      class="text-current"
    />

    <Icon
      v-else-if="icon"
      :name="icon"
      :size="size"
    />

    <span v-if="label">
      {{ label }}
    </span>

    <slot />
  </component>
</template>