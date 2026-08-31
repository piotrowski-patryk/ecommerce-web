<script setup lang="ts">
definePageMeta({
  i18n: {
    paths: {
      pl: '/produkt/[slug]',
      en: '/product/[slug]',
    },
  },
})

const route = useRoute()
const { t } = useI18n()

const slug = computed(() => Array.isArray(route.params.slug)
  ? route.params.slug[0] ?? ''
  : route.params.slug,
)

const product = useProduct(slug)
const cart = useCart()

useSeoMeta({
  title: () => product.data?.name ?? t('products.detail.meta.title'),
  description: () => t('products.detail.meta.description'),
})
</script>

<template>
  <section
    v-if="product.status === 'pending'"
    class="flex min-h-80 flex-1 items-center"
  >
    <div class="container flex justify-center py-8">
      <Spinner size="xl" />
    </div>
  </section>

  <State
    v-else-if="product.error"
    :code="product.error.statusCode ?? 500"
    :title="$t(`error.${product.error.statusCode ?? 500}.title`)"
    :description="$t(`error.${product.error.statusCode ?? 500}.description`)"
    :actions="[{ label: $t('error.redirect'), to: 'products' }]"
  />

  <article
    v-else-if="product.data"
    class="container py-8 sm:py-10"
  >
    <h1 class="font-display text-3xl font-semibold text-strong sm:text-4xl">
      {{ product.data.name }}
    </h1>

    <Button
      v-if="product.data.variants?.[0]"
      icon="cart"
      :label="$t('products.detail.addToCart')"
      color="primary"
      variant="solid"
      size="xl"
      :loading="cart.mutationPending"
      class="mt-8"
      @click="cart.add({
        variantId: product.data.variants[0].id,
        quantity: 1,
      })"
    />
  </article>
</template>