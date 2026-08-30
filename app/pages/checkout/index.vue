<script setup lang="ts">
definePageMeta({
  i18n: {
    paths: {
      pl: '/zamowienie',
      en: '/checkout',
    },
  },
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('checkout.meta.title'),
  description: () => t('checkout.meta.description'),
})
</script>

<template>
  <Heading
    :title="$t('checkout.header.title')"
    :description="$t('checkout.header.description')"
  />
</template>
