<script setup lang="ts">
defineProps<{
  error: {
    statusCode?: number
  }
}>()
</script>

<template>
  <main class="flex flex-1 flex-col">
    <State
      class="my-auto"
      :code="error.statusCode"
      :title="$t(`error.${error.statusCode ?? 500}.title`)"
      :description="$t(`error.${error.statusCode ?? 500}.description`)"
      :actions="[
        {
          label: $t('error.redirect'),
          to: '/',
        },
      ]"
    />
  </main>
</template>