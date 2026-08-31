<script setup lang="ts">
definePageMeta({
  i18n: {
    paths: {
      pl: '/zamowienie',
      en: '/checkout',
    },
  },
})

const { t } = useI18n()
const cart = useCart()
const localeRoute = useLocaleRoute()
const submitting = ref(false)

const summary = computed(() => ({
  heading: {
    label: t('cart.summary.title'),
    as: 'h2' as const,
  },
  body: {
    prices: [
      {
        label: t('cart.summary.subtotal'),
        value: {
          amount: cart.subtotal,
          currency: cart.currency,
        },
      },
    ],
    payment: [
      {
        label: t('cart.summary.total'),
        value: {
          amount: cart.total,
          currency: cart.currency,
        },
        size: 'xl' as const,
        weight: 'semibold' as const,
        color: 'strong' as const,
      },
      {
        label: t('checkout.form.submit'),
        action: {
          type: 'submit' as const,
          form: 'checkout-form',
          loading: submitting.value,
          disabled: submitting.value,
        },
      },
      {
        label: t('checkout.form.terms'),
        as: 'p' as const,
        size: 'sm' as const,
        color: 'muted' as const,
      },
    ],
  },
}))

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  postalCode: '',
  city: '',
  country: 'PL',
  delivery: 'courier',
  payment: 'online',
  notes: '',
})

const countries = computed(() => [
  { label: t('checkout.form.countries.pl'), value: 'PL' },
  { label: t('checkout.form.countries.de'), value: 'DE' },
  { label: t('checkout.form.countries.cz'), value: 'CZ' },
  { label: t('checkout.form.countries.sk'), value: 'SK' },
])

async function submitOrder() {
  if (submitting.value) {
    return
  }

  submitting.value = true
  await navigateTo(localeRoute({ name: 'checkout-success' }))
}

useSeoMeta({
  title: () => t('checkout.meta.title'),
  description: () => t('checkout.meta.description'),
})
</script>

<template>
  <Spinner
    v-if="cart.status === 'pending' && !cart.cart"
    size="xl"
    class="m-auto"
  />

  <template v-else-if="cart.cart?.items.length">
    <Heading
      :title="$t('checkout.header.title')"
      :description="$t('checkout.header.description')"
    />

    <div class="container grid gap-10 pb-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <form
        id="checkout-form"
        class="min-w-0 space-y-10"
        @submit.prevent="submitOrder"
      >
        <section aria-labelledby="contact-title">
          <div class="border-b border-default pb-4">
            <p class="text-sm font-semibold text-primary">
              {{ $t('checkout.steps.contact') }}
            </p>
            <h2 id="contact-title" class="mt-1 font-display text-xl font-semibold text-strong">
              {{ $t('checkout.form.contact.title') }}
            </h2>
            <p class="mt-1 text-sm text-muted">
              {{ $t('checkout.form.contact.description') }}
            </p>
          </div>

          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <label class="sm:col-span-2">
              <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.email') }}</span>
              <Input
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                size="lg"
                required
              />
            </label>

            <label>
              <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.firstName') }}</span>
              <Input
                v-model="form.firstName"
                name="given-name"
                autocomplete="given-name"
                size="lg"
                required
              />
            </label>

            <label>
              <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.lastName') }}</span>
              <Input
                v-model="form.lastName"
                name="family-name"
                autocomplete="family-name"
                size="lg"
                required
              />
            </label>

            <label class="sm:col-span-2">
              <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.phone') }}</span>
              <Input
                v-model="form.phone"
                type="tel"
                name="tel"
                autocomplete="tel"
                size="lg"
                required
              />
            </label>
          </div>
        </section>

        <section aria-labelledby="delivery-address-title">
          <div class="border-b border-default pb-4">
            <p class="text-sm font-semibold text-primary">
              {{ $t('checkout.steps.address') }}
            </p>
            <h2 id="delivery-address-title" class="mt-1 font-display text-xl font-semibold text-strong">
              {{ $t('checkout.form.address.title') }}
            </h2>
          </div>

          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <label class="sm:col-span-2">
              <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.street') }}</span>
              <Input
                v-model="form.street"
                name="street-address"
                autocomplete="street-address"
                size="lg"
                required
              />
            </label>

            <label>
              <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.postalCode') }}</span>
              <Input
                v-model="form.postalCode"
                name="postal-code"
                autocomplete="postal-code"
                size="lg"
                placeholder="00-000"
                required
              />
            </label>

            <label>
              <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.city') }}</span>
              <Input
                v-model="form.city"
                name="address-level2"
                autocomplete="address-level2"
                size="lg"
                required
              />
            </label>

            <label class="sm:col-span-2">
              <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.country') }}</span>
              <Select
                v-model="form.country"
                :items="countries"
                name="country"
                autocomplete="country"
                size="lg"
                required
              />
            </label>
          </div>
        </section>

        <fieldset>
          <legend class="w-full border-b border-default pb-4">
            <span class="block text-sm font-semibold text-primary">{{ $t('checkout.steps.delivery') }}</span>
            <span class="mt-1 block font-display text-xl font-semibold text-strong">{{ $t('checkout.form.delivery.title') }}</span>
          </legend>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <label
              v-for="method in ['courier', 'pickup']"
              :key="method"
              class="flex cursor-pointer gap-3 rounded-lg border border-default p-4 transition-colors has-checked:border-primary has-checked:bg-primary/5"
            >
              <input
                v-model="form.delivery"
                type="radio"
                name="delivery"
                :value="method"
                class="mt-1 size-4 accent-primary"
              >
              <span class="min-w-0 flex-1">
                <span class="block font-medium text-strong">
                  {{ $t(`checkout.form.delivery.${method}.title`) }}
                </span>
                <span class="mt-1 block text-sm text-muted">{{ $t(`checkout.form.delivery.${method}.description`) }}</span>
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend class="w-full border-b border-default pb-4">
            <span class="block text-sm font-semibold text-primary">{{ $t('checkout.steps.payment') }}</span>
            <span class="mt-1 block font-display text-xl font-semibold text-strong">{{ $t('checkout.form.payment.title') }}</span>
          </legend>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <label
              v-for="method in ['online', 'transfer']"
              :key="method"
              class="flex cursor-pointer gap-3 rounded-lg border border-default p-4 transition-colors has-checked:border-primary has-checked:bg-primary/5"
            >
              <input
                v-model="form.payment"
                type="radio"
                name="payment"
                :value="method"
                class="mt-1 size-4 accent-primary"
              >
              <span>
                <span class="block font-medium text-strong">{{ $t(`checkout.form.payment.${method}.title`) }}</span>
                <span class="mt-1 block text-sm text-muted">{{ $t(`checkout.form.payment.${method}.description`) }}</span>
              </span>
            </label>
          </div>
        </fieldset>

        <label class="block">
          <span class="mb-2 block text-sm font-medium text-strong">{{ $t('checkout.form.notes') }}</span>
          <textarea
            v-model="form.notes"
            name="notes"
            rows="4"
            :placeholder="$t('checkout.form.notesPlaceholder')"
            class="block w-full resize-y rounded-md border border-default bg-default px-4 py-3 text-base text-default placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
          />
        </label>
      </form>

      <aside class="lg:sticky lg:top-24">
        <CartSummary v-bind="summary" />
      </aside>
    </div>
  </template>

  <State
    v-else
    icon="cart"
    class="my-auto"
    :title="$t('cart.empty.title')"
    :description="$t('cart.empty.description')"
    :actions="[
      {
        label: $t('cart.empty.action'),
        to: 'products',
      },
    ]"
  />
</template>