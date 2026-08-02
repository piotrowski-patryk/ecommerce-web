<script setup lang="ts">
import type { CartProduct } from '~/types/cart'

defineProps<{
  product: CartProduct
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const value = ref(5)
</script>

<template>
  <div class="group grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center gap-x-4 gap-y-2 rounded-md border border-border bg-surface p-4 md:grid-cols-[auto_1fr_auto_auto_auto] md:grid-rows-1 md:gap-y-0">
    <!-- Product image -->
    <NuxtLink
      v-if="product.url"
      :to="localePath('')"
      class="row-span-2 block size-20 shrink-0 overflow-hidden md:row-span-1 md:size-24"
    >
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="size-full object-contain"
      >
    </NuxtLink>

    <div
      v-else
      class="row-span-2 size-20 shrink-0 overflow-hidden md:row-span-1 md:size-24"
    >
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="size-full object-contain"
      >
    </div>

    <!-- Product information -->
    <div class="flex flex-col justify-center">
      <h3 class="font-medium">
        <NuxtLink
          v-if="product.url"
          :to="localePath('')"
          class="hover:underline"
        >
          {{ product.name }}
        </NuxtLink>

        <template v-else>
          {{ product.name }}
        </template>
      </h3>

      <p
        v-if="product.attributes"
        class="text-sm text-muted-foreground"
      >
        {{ product.attributes }}
      </p>
    </div>

    <!-- Quantity -->
    <div class="col-start-3 row-start-2 justify-self-end text-sm text-muted-foreground md:col-start-3 md:row-start-auto md:justify-self-start">
      <InputNumber v-model="value" :min="1" />
    </div>

    <!-- Price -->
    <div class="col-start-2 row-start-2 font-semibold md:col-start-4 md:row-start-auto md:px-4">
      {{ product.price }} zł
    </div>

    <!-- Remove -->
    <button
      type="button"
      class="col-start-3 row-start-1 cursor-pointer self-start justify-self-end text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100 md:col-start-5 md:self-center"
      :aria-label="t('common.remove', { name: product.name })"
    >
      <Icon name="close" class="size-5" />
    </button>
  </div>
</template>