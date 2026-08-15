<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  next?: () => void
}>()
</script>

<template>
  <aside class="w-full lg:sticky lg:top-6 lg:w-96">

    <h2 class="mb-4 text-lg font-semibold">
      {{ t('cart.summary.title') }}
    </h2>

    <div class="bg-surface border border-border rounded-md p-6">
      <dl class="space-y-3 text-sm">
        <div class="flex items-center justify-between gap-4">
          <dt class="text-muted-foreground">{{ t('cart.summary.subtotal') }}</dt>
          <dd class="font-semibold">2 500 zł</dd>
        </div>

        <div class="flex items-center justify-between gap-4">
          <dt class="text-muted-foreground">{{ t('cart.summary.shipping') }}</dt>
          <dd class="font-semibold">0 zł</dd>
        </div>

        <div class="flex items-center justify-between gap-4 border-t border-border pt-3 text-base font-semibold">
          <dt>{{ t('cart.summary.total') }}</dt>
          <dd>2 500 zł</dd>
        </div>
      </dl>

      <Button
        @click="next"
        variant="primary"
        class="w-full mt-6"
      >
        {{ t('common.next') }}: {{ t('cart.steps.data.title') }}
      </Button>

    </div>
  </aside>
</template>