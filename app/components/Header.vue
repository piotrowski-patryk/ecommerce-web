<script setup lang="ts">
const { t } = useI18n()
const cart = useCart()

const menu = computed(() => [[
  {
    label: t('common.header.menu.products'),
    to: 'products',
  },
]])
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-default bg-default/75 backdrop-blur">
    <div class="container flex h-16 items-center justify-between gap-4">
      <Dropdown :items="menu">
        <Button
          icon="menu"
          color="neutral"
          variant="ghost"
          size="xl"
          :aria-label="$t('common.header.menu.open')"
        />
      </Dropdown>

      <Button
        to="cart"
        icon="cart"
        color="neutral"
        variant="ghost"
        size="xl"
        class="relative"
        :aria-label="$t('common.header.cart.label')"
      >
        <span
          v-if="cart.itemCount > 0"
          aria-hidden="true"
          class="absolute -top-1 left-5 min-w-4 rounded-full bg-primary px-1 text-center text-xs leading-4 font-medium tabular-nums text-inverted"
        >
          {{ cart.itemCount }}
        </span>
      </Button>
    </div>
  </header>
</template>