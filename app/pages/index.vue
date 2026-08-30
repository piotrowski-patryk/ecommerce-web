<script setup lang="ts">
const localePath = useLocalePath()

await navigateTo(localePath('products'), { redirectCode: 302 })
</script>

<template />
