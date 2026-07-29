<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
    <div class="container flex h-16 items-center justify-between">

      <button
        type="button"
        :aria-label="t('header.menu.open')"
      >
        <Icon name="menu" />
      </button>

      <NuxtLinkLocale
        to="cart"
        :aria-label="t('header.cart.label')"
        class="flex items-center gap-1"
      >
        <span
          aria-hidden="true"
          class="text-primary tabular-nums"
        >
          0
        </span>

        <Icon name="cart" />
      </NuxtLinkLocale>

    </div>
  </header>
</template>