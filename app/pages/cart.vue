<script setup lang="ts">
definePageMeta({
  i18n: {
    paths: {
      pl: '/koszyk',
      en: '/cart',
    },
  },
})

const { t } = useI18n()
const cart = useCart()

useSeoMeta({
  title: () => t('cart.meta.title'),
  description: () => t('cart.meta.description'),
})
</script>

<template>
  <!-- Loading state -->
  <Spinner
    v-if="cart.status === 'pending' && !cart.cart"
    size="xl"
    class="m-auto"
  />

  <!-- Populated cart -->
  <template v-else-if="cart.cart?.items.length">
    <Heading
      :title="$t('cart.header.title')"
      :description="$t('cart.header.description')"
    />

    <div
      class="container grid gap-8 pb-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start"
    >
      <section
        aria-labelledby="cart-products-title"
        class="min-w-0 sm:grid"
      >
        <h2
          id="cart-products-title"
          class="flex h-14 w-fit items-center gap-2 font-display text-lg font-semibold text-strong sm:z-10 sm:col-start-1 sm:row-start-1"
        >
          {{ $t('cart.table.products') }}
          <span class="text-muted">( {{ cart.cart.items.length }} )</span>
        </h2>

        <CartTable
          :items="cart.cart.items"
          aria-labelledby="cart-products-title"
          class="sm:col-start-1 sm:row-start-1"
        />
      </section>

      <section aria-labelledby="cart-summary-title">
        <h2
          id="cart-summary-title"
          class="flex h-14 items-center border-b border-default font-display text-lg font-semibold text-strong"
        >
          {{ $t('cart.summary.title') }}
        </h2>

        <CartSummary />
      </section>
    </div>
  </template>

  <!-- Empty cart -->
  <State
    v-else
    icon="cart"
    class="my-auto"
    :title="$t('cart.empty.title')"
    :description="$t('cart.empty.description')"
    :actions="[
      {
        label: $t('cart.empty.action'),
        to: 'products',
      },
    ]"
  />
</template>
