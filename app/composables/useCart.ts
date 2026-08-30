import type {
  Cart,
  AddToCartPayload,
} from '~/types/cart'
import type { ApiResponse } from '~/types/api'

type Quantity = string | number | undefined

export function useCart() {
  const response = useFetch<ApiResponse<Cart>>('/api/cart', {
    key: 'cart',
  })

  const cart = computed(() => response.data.value?.data)
  const meta = computed(() => response.data.value?.meta)
  const itemCount = computed(() =>
    cart.value?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
  )
  const subtotal = computed(() =>
    cart.value?.items.reduce(
      (sum, item) =>
        sum + Number(item.product.variant.price.amount) * item.quantity,
      0,
    ) ?? 0,
  )
  const shipping = computed(() => 0)
  const total = computed(() => subtotal.value + shipping.value)
  const currency = computed(() =>
    cart.value?.items[0]?.product.variant.price.currency ?? 'PLN',
  )
  const mutationPending = useState('cart:mutation-pending', () => false)

  async function mutate(request: () => Promise<ApiResponse<Cart>>) {
    if (mutationPending.value) {
      return
    }

    mutationPending.value = true

    try {
      await request()
      await response.refresh()
    }
    finally {
      mutationPending.value = false
    }
  }

  function add(payload: AddToCartPayload) {
    return mutate(() => $fetch<ApiResponse<Cart>>('/api/cart/items', {
      method: 'POST',
      body: payload,
    }))
  }

  async function update(
    itemId: string,
    value: Quantity,
  ) {
    const quantity = Number(value)

    if (
      mutationPending.value
      || !Number.isInteger(quantity)
      || quantity <= 0
    ) {
      return
    }

    const item = cart.value?.items.find(item => item.id === itemId)

    if (!item || item.quantity === quantity) {
      return
    }

    const previousQuantity = item.quantity
    item.quantity = quantity

    try {
      await mutate(() => $fetch<ApiResponse<Cart>>(
        `/api/cart/items/${itemId}`,
        {
          method: 'PATCH',
          body: { quantity },
        },
      ))
    }
    catch (error) {
      item.quantity = previousQuantity
      throw error
    }
  }

  function remove(itemId: string) {
    return mutate(() => $fetch<ApiResponse<Cart>>(
      `/api/cart/items/${itemId}`,
      {
        method: 'DELETE',
      },
    ))
  }

  return reactive({
    cart,
    meta,
    itemCount,
    subtotal,
    shipping,
    total,
    currency,
    status: response.status,
    error: response.error,
    refresh: response.refresh,
    mutationPending,
    add,
    update,
    remove,
  })
}
