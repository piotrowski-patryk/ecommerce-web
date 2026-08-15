<script setup lang="ts">
import type { CartItem } from '~/types/cart'

defineProps<{
  item: CartItem
}>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div
    class="group grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center gap-x-4 gap-y-2 rounded-md border border-border bg-surface p-4 md:grid-cols-[auto_1fr_auto_auto_auto] md:grid-rows-1 md:gap-y-0"
  >
    <!-- Product image -->
    <NuxtLink
      :to="localePath(`/produkty/${item.product.slug}`)"
      class="row-span-2 block size-20 shrink-0 overflow-hidden md:row-span-1 md:size-24"
    >
      <img
        :src="item.product.image"
        :alt="item.product.name"
        class="size-full object-contain"
      >
    </NuxtLink>

    <!-- Product information -->
    <div class="flex flex-col justify-center">
      <h3 class="font-medium">
        <NuxtLink
          :to="localePath(`/produkty/${item.product.slug}`)"
          class="hover:underline"
        >
          {{ item.product.name }}
        </NuxtLink>
      </h3>
    </div>

    <!-- Quantity -->
    <div
      class="col-start-3 row-start-2 justify-self-end text-sm text-muted-foreground md:col-start-3 md:row-start-auto md:justify-self-start"
    >
      <InputNumber
        :model-value="item.quantity"
        :min="1"
      />
    </div>

    <!-- Price -->
    <div
      class="col-start-2 row-start-2 font-semibold md:col-start-4 md:row-start-auto md:px-4"
    >
      {{ item.subtotal }} zł
    </div>

    <!-- Remove -->
    <button
      type="button"
      class="col-start-3 row-start-1 self-start justify-self-end text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100 md:col-start-5 md:self-center"
      :aria-label="t('common.remove', { name: item.product.name })"
    >
      <Icon
        name="close"
        class="size-5"
      />
    </button>
  </div>
</template>