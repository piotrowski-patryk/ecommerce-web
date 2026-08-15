<script setup lang="ts">
const route = useRoute()

const slug = computed(() => route.params.slug as string)

const {
  product,
  pending,
  error,
} = useProduct(slug)
</script>

<template>
  <div>
    <pre>{{ product }}</pre>
    <pre>pending: {{ pending }}</pre>
    <pre>error: {{ error }}</pre>
  </div>
</template>