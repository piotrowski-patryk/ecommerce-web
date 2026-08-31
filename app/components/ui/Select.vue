<script setup lang="ts">
defineOptions({ inheritAttrs: false })

type SelectValue = string | number

interface SelectItem {
  label: string
  value: SelectValue
  disabled?: boolean
}

interface Props {
  items: SelectItem[]
  placeholder?: string

  // STYLE
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  // STATE
  disabled?: boolean
  required?: boolean
  invalid?: boolean
}

const {
  items,
  placeholder = 'Select',
  color = 'primary',
  variant = 'outline',
  size = 'md',
  disabled,
  required,
  invalid,
} = defineProps<Props>()

const modelValue = defineModel<SelectValue | undefined>()
</script>

<template>
  <div class="relative w-full min-w-0">
    <select
      v-bind="$attrs"
      v-model="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-invalid="invalid || undefined"
      :style="{
        '--select-color': invalid
          ? 'var(--color-error)'
          : color === 'neutral'
            ? 'var(--border-color-strong)'
            : `var(--color-${color})`,
      }"
      class="
        peer block w-full min-w-0 appearance-none rounded-md border tabular-nums
        cursor-pointer transition-colors focus:outline-none
        disabled:cursor-not-allowed disabled:opacity-75
      "
      :class="[
        modelValue === undefined ? 'text-muted' : 'text-default',

        variant === 'outline' && 'border-default bg-default enabled:hover:bg-muted',
        variant === 'soft' && 'border-transparent bg-(--select-color)/10 enabled:hover:bg-muted',
        variant === 'subtle' && 'border-(--select-color)/20 bg-(--select-color)/5 enabled:hover:bg-strong/75',
        variant === 'ghost' && 'border-transparent bg-transparent enabled:hover:bg-muted',
        variant === 'none' && 'border-transparent bg-transparent',
        invalid && variant !== 'none' && 'border-(--select-color)',

        size === 'xs' && 'h-7 pr-8 pl-2.5 text-sm/4 md:text-xs',
        size === 'sm' && 'h-8 pr-9 pl-3 text-base/5 md:text-sm',
        size === 'md' && 'h-9 pr-10 pl-3.5 text-base/5 md:text-sm',
        size === 'lg' && 'h-10 pr-11 pl-4 text-base',
        size === 'xl' && 'h-11 pr-12 pl-5 text-base',
      ]"
    >
      <option
        v-if="placeholder"
        :value="undefined"
        disabled
        hidden
      >
        {{ placeholder }}
      </option>

      <option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        class="text-default"
      >
        {{ item.label }}
      </option>
    </select>

    <Icon
      name="arrow"
      :size="size"
      class="pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted transition-opacity peer-disabled:opacity-75"
      :class="[
        size === 'xs' && 'inset-e-2.5',
        size === 'sm' && 'inset-e-3',
        size === 'md' && 'inset-e-3.5',
        size === 'lg' && 'inset-e-4',
        size === 'xl' && 'inset-e-5',
      ]"
    />
  </div>
</template>