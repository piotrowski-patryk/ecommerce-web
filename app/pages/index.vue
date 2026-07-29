<script setup lang="ts">
const localePath = useLocalePath()

await navigateTo(
  localePath({
    name: 'cart',
  })
)
</script>

<template></template>