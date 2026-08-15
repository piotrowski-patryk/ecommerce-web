<script setup lang="ts">
interface Props {
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'base' | 'lg'
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  loading: false,
  variant: 'outline',
  size: 'base',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    :class="[
      // Variants
      {
        'bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent': variant === 'primary',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent': variant === 'secondary',
        'border border-muted bg-background hover:bg-muted/50 text-foreground': variant === 'outline',
        'hover:bg-muted/50 text-foreground border border-transparent': variant === 'ghost',
        'bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-transparent': variant === 'danger',
      },
      // Sizes
      {
        'h-10 px-4 text-sm font-normal': size === 'sm',
        'h-12 px-5 text-base font-medium': size === 'base',
        'h-14 px-6 text-lg font-semibold': size === 'lg',
      },
    ]"
    @click="emit('click', $event)"
  >
    <Spinner 
      v-if="loading" 
      :size="size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'base'" 
    />
    <slot />
  </button>
</template>