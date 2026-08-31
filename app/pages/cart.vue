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

const table = computed(() => ({
  heading: [
    {
      label: t('cart.table.products'),
      value: `( ${cart.cart?.items.length ?? 0} )`,
      as: 'h2' as const,
      mobile: 'main' as const,
    },
    {
      label: t('cart.table.quantity'),
      align: 'right' as const,
      mobile: 'bottom-end' as const,
    },
    {
      label: t('cart.table.price'),
      align: 'right' as const,
      mobile: 'bottom-start' as const,
    },
    {
      label: t('common.action.remove'),
      hidden: true,
      align: 'right' as const,
      mobile: 'top-end' as const,
    },
  ],
  body: cart.cart?.items.map(item => ({
    key: item.id,
    cells: [
      {
        label: item.product.name,
        description: item.product.variant.name,
        to: {
          name: 'product-slug',
          params: { slug: item.product.variant.slug },
        },
        media: item.product.variant.media
          ? {
              src: item.product.variant.media.url,
              alt: item.product.variant.media.alt,
            }
          : undefined,
      },
      {
        select: {
          value: item.quantity,
          items: Array.from(
            { length: Math.max(item.quantity, item.product.variant.stock) },
            (_, index) => ({
              label: String(index + 1),
              value: index + 1,
            }),
          ),
          label: t('cart.table.quantity'),
          disabled: cart.mutationPending,
          onChange: (value: string | number | undefined) => cart.update(item.id, value),
        },
      },
      {
        value: {
          amount: Number(item.product.variant.price.amount),
          currency: item.product.variant.price.currency,
        },
      },
      {
        action: {
          label: t('cart.table.remove', { product: item.product.name }),
          icon: 'cross',
          color: 'error' as const,
          variant: 'ghost' as const,
          disabled: cart.mutationPending,
          onClick: () => cart.remove(item.id),
        },
      },
    ],
  })) ?? [],
}))

const summary = computed(() => ({
  heading: {
    label: t('cart.summary.title'),
    as: 'h2' as const,
  },
  body: {
    prices: [
      {
        label: t('cart.summary.subtotal'),
        value: {
          amount: cart.subtotal,
          currency: cart.currency,
        },
      },
      {
        label: t('cart.summary.shipping'),
        value: {
          amount: cart.shipping,
          currency: cart.currency,
        },
      },
    ],
    payment: [
      {
        label: t('cart.summary.total'),
        value: {
          amount: cart.total,
          currency: cart.currency,
        },
        size: 'xl' as const,
        weight: 'semibold' as const,
        color: 'strong' as const,
      },
      {
        label: t('cart.summary.checkout'),
        action: {
          to: { name: 'checkout' },
          disabled: cart.mutationPending,
          loading: cart.mutationPending,
        },
      },
    ],
  },
}))
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

    <div class="container grid gap-8 pb-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <section class="min-w-0">
        <Table v-bind="table" />
      </section>

      <aside class="lg:sticky lg:top-24">
        <CartSummary v-bind="summary" />
      </aside>
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