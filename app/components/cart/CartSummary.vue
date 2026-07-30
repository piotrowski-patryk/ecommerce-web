<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  next?: () => void
}>()
</script>

<template>
  <article class="w-full lg:sticky lg:top-6 lg:w-96">
    <h2 class="mb-4 text-lg font-semibold">
      {{ t('cart.summary.title') }}
    </h2>

    <div class="bg-surface p-4">
      <dl class="space-y-3 text-sm">
        <div class="flex justify-between">
          <dt class="text-muted-foreground">{{ t('cart.summary.subtotal') }}</dt>
          <dd class="font-medium">2 500 zł</dd>
        </div>

        <div class="flex justify-between">
          <dt class="text-muted-foreground">{{ t('cart.summary.shipping') }}</dt>
          <dd class="font-medium">0 zł</dd>
        </div>

        <div class="border-t border-border pt-3 flex justify-between text-base font-semibold">
          <dt>{{ t('cart.summary.total') }}</dt>
          <dd>2 500 zł</dd>
        </div>
      </dl>

      <div class="mt-6">
        <Button
          variant="primary"
          class="w-full"
          @click="next"
        >
          {{ t('common.next') }}: {{ t('cart.steps.data.title') }}
        </Button>
      </div>
    </div>
  </article>
</template>