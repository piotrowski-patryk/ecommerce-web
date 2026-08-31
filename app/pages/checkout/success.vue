<script setup lang="ts">
definePageMeta({
  i18n: {
    paths: {
      pl: '/zamowienie/sukces',
      en: '/checkout/success',
    },
  },
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('checkout.success.meta.title'),
  description: () => t('checkout.success.meta.description'),
})
</script>

<template>
  <State
    icon="check"
    color="success"
    class="my-auto"
    :title="$t('checkout.success.title')"
    :description="$t('checkout.success.description')"
    :actions="[
      {
        label: $t('checkout.success.redirect'),
        to: 'products',
      },
    ]"
  />
</template>