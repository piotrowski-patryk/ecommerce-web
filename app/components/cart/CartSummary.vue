<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <article class="w-full lg:sticky lg:top-6 lg:w-96">
    <h2 class="mb-4 text-lg font-semibold">
      {{ t('cart.summary.title') }}
    </h2>
  </article>
</template>