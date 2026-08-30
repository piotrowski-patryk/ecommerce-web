<script setup lang="ts">
const cart = useCart()
</script>

<template>
  <div v-if="cart.cart" class="pt-5">
    <dl class="space-y-4 text-base">
      <div class="flex items-center justify-between gap-4">
        <dt class="text-muted">
          {{ $t('cart.summary.subtotal') }}
        </dt>

        <dd class="font-medium tabular-nums">
          {{ $n(cart.subtotal, {
            style: 'currency',
            currency: cart.currency,
          }) }}
        </dd>
      </div>

      <div class="flex items-center justify-between gap-4">
        <dt class="text-muted">
          {{ $t('cart.summary.shipping') }}
        </dt>

        <dd class="font-medium tabular-nums">
          {{ $n(cart.shipping, {
            style: 'currency',
            currency: cart.currency,
          }) }}
        </dd>
      </div>

      <div class="flex items-center justify-between gap-4 border-t border-default pt-5 font-semibold text-strong">
        <dt class="text-xl font-semibold">
          {{ $t('cart.summary.total') }}
        </dt>

        <dd class="text-xl font-semibold tabular-nums">
          {{ $n(cart.total, {
            style: 'currency',
            currency: cart.currency,
          }) }}
        </dd>
      </div>
    </dl>

    <Button
      :to="cart.mutationPending ? undefined : { name: 'checkout' }"
      :disabled="cart.mutationPending"
      :loading="cart.mutationPending"
      size="xl"
      class="mt-5 w-full"
    >
      {{ $t('cart.summary.checkout') }}
    </Button>
  </div>
</template>
