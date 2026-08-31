<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <header>
    <div class="container py-8 text-pretty sm:py-10">
      <h1 class="font-display text-3xl font-semibold text-strong sm:text-4xl">
        {{ title }}
      </h1>

      <p
        v-if="description"
        class="mt-3 max-w-2xl text-base text-muted sm:text-lg"
      >
        {{ description }}
      </p>
    </div>
  </header>
</template>