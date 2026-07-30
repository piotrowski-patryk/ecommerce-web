<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})

const { t } = useI18n()
</script>

<template>
  <div 
    class="inline-flex items-center justify-center text-primary"
    role="status"
    :aria-label="t('common.loading')"
  >
    <Icon
      name="loader"
      class="animate-spin"
      :class="{
        'size-4': size === 'sm',
        'size-6': size === 'md',
        'size-8': size === 'lg',
      }"
    />
  </div>
</template>