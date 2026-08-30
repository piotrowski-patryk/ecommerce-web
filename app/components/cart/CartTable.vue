<script setup lang="ts">
import type { CartItem } from '~/types/cart'

defineProps<{
  items: CartItem[]
}>()
</script>

<template>
  <table class="w-full">
    <thead>
      <tr class="border-b border-default text-sm font-semibold text-muted uppercase sm:h-14">
        <th class="py-0 text-left" scope="col">
          <span class="sr-only">
            {{ $t('cart.table.products') }}
          </span>
        </th>

        <th class="hidden py-0 text-right sm:table-cell" scope="col">
          {{ $t('cart.table.quantity') }}
        </th>

        <th class="hidden py-0 text-right sm:table-cell" scope="col">
          {{ $t('cart.table.price') }}
        </th>

        <th class="hidden py-0 text-right sm:table-cell" scope="col" aria-hidden="true" />
      </tr>
    </thead>

    <tbody class="divide-y divide-default">
      <CartItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </tbody>
  </table>
</template>
