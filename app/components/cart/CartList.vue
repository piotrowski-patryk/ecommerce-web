<script setup lang="ts">
  import type { CartProduct } from '~/types/cart';

  defineProps<{
    items: CartProduct[]
  }>()

  const { t } = useI18n()
</script>

<template>
  <section class="flex-1" aria-labelledby="cart-products-heading">
    <h2 id="cart-products-heading" class="mb-4 text-lg font-semibold">
      {{ t('cart.list.title') }}
      <span class="text-sm font-normal text-muted-foreground">
        ({{ items.length }})
      </span>
    </h2>

    <ul class="space-y-4">
      <CartListItem
        v-for="item in items"
        :key="item.id"
        :product="item"
      />
    </ul>
  </section>
</template>