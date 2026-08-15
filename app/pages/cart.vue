<script setup lang="ts">
defineI18nRoute({
  paths: {
    pl: '/koszyk',
    en: '/cart',
  },
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('cart.seo.title'),
  description: () => t('cart.seo.description'),
  ogTitle: () => t('cart.seo.title'),
  ogDescription: () => t('cart.seo.description'),
})

const { cart, pending, error } = await useCart()

const steps = computed(() => [
  {
    slot: 'cart' as const,
    title: t('cart.steps.cart.title'),
    description: t('cart.steps.cart.description'),
    icon: 'cart',
  },
  {
    slot: 'data' as const,
    title: t('cart.steps.data.title'),
    description: t('cart.steps.data.description'),
    icon: 'file-text',
  },
  {
    slot: 'payment' as const,
    title: t('cart.steps.payment.title'),
    description: t('cart.steps.payment.description'),
    icon: 'dollar-sign',
  },
  {
    slot: 'delivery' as const,
    title: t('cart.steps.delivery.title'),
    description: t('cart.steps.delivery.description'),
    icon: 'check',
  },
])
</script>

<template>
  <Stepper
    :items="steps"
    :clickable-completed="true"
    class="container py-6"
  >
    <template #cart="{ next }">
      <header class="max-w-2xl py-4">
        <h1 class="text-4xl font-semibold">
          {{ t('cart.header.title') }}
        </h1>

        <p class="mt-2 text-sm leading-5 text-muted-foreground">
          {{ t('cart.header.description') }}
        </p>
      </header>

      <template v-if="cart?.items?.length">
        <div class="flex flex-col gap-6 py-6 lg:flex-row lg:items-start">
          <CartList :items="cart.items" />
          <CartSummary
            :cart="cart"
            :next="next"
          />
        </div>
      </template>

      <CartEmpty v-else />
    </template>

    <template #data>
      <Modal title="Tytuł jakiś">
        <Button>Otwórz pełny ekran</Button>

        <template #body>
          <p>Zawartość wyświetlana na pełnym ekranie...</p>
        </template>
      </Modal>
    </template>
  </Stepper>
</template>