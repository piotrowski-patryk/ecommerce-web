<script setup lang="ts">
definePageMeta({
  i18n: {
    paths: {
      pl: '/zamowienie/nieudane',
      en: '/checkout/failure',
    },
  },
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('checkout.failure.meta.title'),
  description: () => t('checkout.failure.meta.description'),
})
</script>

<template>
  <State
    icon="cross"
    color="error"
    class="my-auto"
    :title="$t('checkout.failure.title')"
    :description="$t('checkout.failure.description')"
    :actions="[
      {
        label: $t('checkout.failure.retry'),
        to: 'checkout',
      },
      {
        label: $t('checkout.failure.redirect'),
        to: 'products',
        variant: 'outline',
      },
    ]"
  />
</template>
