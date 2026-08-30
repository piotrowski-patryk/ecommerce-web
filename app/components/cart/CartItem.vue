<script setup lang="ts">
import type { CartItem } from '~/types/cart'

const { item } = defineProps<{
  item: CartItem
}>()

const cart = useCart()

const options = computed(() =>
  Array.from(
    { length: Math.max(item.quantity, item.product.variant.stock) },
    (_, index) => ({
      label: String(index + 1),
      value: index + 1,
    }),
  ),
)
</script>

<template>
  <tr
    class="grid grid-cols-[5rem_minmax(0,1fr)_auto] grid-rows-[auto_auto] content-between gap-x-4 py-5 sm:table-row"
  >
    <td class="contents sm:table-cell sm:py-5 sm:align-middle">
      <div class="contents sm:flex sm:items-center sm:gap-3">
        <img
          v-if="item.product.variant.media"
          :src="item.product.variant.media.url"
          :alt="item.product.variant.media.alt"
          class="row-span-2 size-20 self-center rounded-sm"
        >

        <div class="col-start-2 row-start-1 min-w-0 self-start sm:self-center">
          <NuxtLinkLocale
            :to="{
              name: 'product-slug',
              params: { slug: item.product.variant.slug },
            }"
            class="line-clamp-2 text-base font-semibold text-strong hover:underline"
          >
            {{ item.product.name }}
          </NuxtLinkLocale>

          <span class="mt-1 block text-sm text-muted">
            {{ item.product.variant.name }}
          </span>
        </div>
      </div>
    </td>

    <td class="col-start-3 row-start-2 w-20 justify-self-end self-end sm:table-cell sm:py-5 sm:text-right sm:align-middle">
      <Select
        :model-value="item.quantity"
        :items="options"
        size="md"
        placeholder=""
        :disabled="cart.mutationPending"
        :aria-label="$t('cart.table.quantity')"
        @update:model-value="cart.update(item.id, $event)"
      />
    </td>

    <td class="col-start-2 row-start-2 self-end text-base font-semibold tabular-nums text-strong sm:table-cell sm:py-5 sm:text-right sm:align-middle">
      {{ $n(Number(item.product.variant.price.amount), {
        style: 'currency',
        currency: item.product.variant.price.currency,
      }) }}
    </td>

    <td class="col-start-3 row-start-1 self-start text-right sm:table-cell sm:py-5 sm:align-middle">
      <Button
        icon="cross"
        color="error"
        variant="ghost"
        size="md"
        :disabled="cart.mutationPending"
        :aria-label="$t('cart.table.remove', { product: item.product.name })"
        @click="cart.remove(item.id)"
      />
    </td>
  </tr>
</template>
