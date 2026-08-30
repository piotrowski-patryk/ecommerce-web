<script setup lang="ts">
definePageMeta({
  i18n: {
    paths: {
      pl: '/produkty',
      en: '/products',
    },
  },
})

const { t } = useI18n()
const products = useProducts()

useSeoMeta({
  title: () => t('products.meta.title'),
  description: () => t('products.meta.description'),
})
</script>

<template>
  <Heading
    :title="$t('products.header.title')"
    :description="$t('products.header.description')"
  />

  <section class="container pb-10">
    <div
      v-if="products.status === 'pending'"
      class="flex min-h-64 items-center justify-center"
    >
      <Spinner size="xl" />
    </div>

    <State
      v-else-if="products.error"
      :heading-level="2"
      mode="embedded"
      :code="products.error.statusCode ?? 500"
      :title="$t(`error.${products.error.statusCode ?? 500}.title`)"
      :description="$t(`error.${products.error.statusCode ?? 500}.description`)"
    />

    <ul
      v-else-if="products.data?.length"
      class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      <li
        v-for="product in products.data"
        :key="product.id"
        class="flex flex-col rounded-md border border-default bg-muted p-6"
      >
        <h2 class="font-display text-lg font-semibold text-strong">
          {{ product.name }}
        </h2>

        <Button
          v-if="product.variants[0]"
          :to="{
            name: 'product-slug',
            params: { slug: product.variants[0].slug },
          }"
          :label="$t('products.list.view')"
          variant="outline"
          size="lg"
          class="mt-5 self-start"
        />
      </li>
    </ul>

    <State
      v-else
      :heading-level="2"
      mode="embedded"
      :title="$t('products.empty.title')"
      :description="$t('products.empty.description')"
    />
  </section>
</template>
