<script setup lang="ts">
const { t } = useI18n()

defineI18nRoute({
  paths: {
    pl: '/koszyk',
    en: '/cart',
  },
})

useSeoMeta({
  title: () => t('cart.seo.title'),
  description: () => t('cart.seo.description'),
  ogTitle: () => t('cart.seo.title'),
  ogDescription: () => t('cart.seo.description'),
})

const cartItems = [
  {
    id: 1,
    name: 'Profesjonalna strona internetowa',
    price: 2500,
    quantity: 1,
    image: 'https://placehold.co/400x400?text=Website',
    url: '/produkty/strona-internetowa',
    attributes: 'Responsywna strona WWW + CMS',
  },
  {
    id: 2,
    name: 'Optymalizacja SEO',
    price: 800,
    quantity: 1,
    image: 'https://placehold.co/400x400?text=Website',
    url: '/produkty/seo',
    attributes: 'Audyt SEO + optymalizacja techniczna',
  },
]

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

      <div class="flex flex-col gap-6 py-6 lg:flex-row lg:items-start">
        <!-- Cart products -->
        <section
          class="flex-1"
          aria-labelledby="cart-products-heading"
        >
          <h2
            id="cart-products-heading"
            class="mb-4 text-lg font-semibold"
          >
            Produkty w koszyku

            <span class="text-sm font-normal text-muted-foreground">
              ({{ cartItems.length }})
            </span>
          </h2>

          <ul class="space-y-4">
            <CartItem
              v-for="item in cartItems"
              :key="item.id"
              :product="item"
            />
          </ul>
        </section>

        <!-- Cart summary -->
        <article class="w-full lg:sticky lg:top-6 lg:w-96">
          <button @click="next()">Dalej</button>
        </article>
      </div>
    </template>

    <template #data></template>
  </Stepper>
</template>