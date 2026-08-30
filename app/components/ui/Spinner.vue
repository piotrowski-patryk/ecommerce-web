<script setup lang="ts">
interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const { size = 'md' } = defineProps<Props>()
</script>

<template>
  <div
    class="inline-flex items-center justify-center text-primary"
    role="status"
    :aria-label="$t('common.action.loading')"
  >
    <Icon
      name="loader"
      :size="size"
      class="animate-spin"
    />
  </div>
</template>
