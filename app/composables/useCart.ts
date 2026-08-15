import type {
  Cart,
  AddToCartPayload,
  UpdateCartItemPayload,
} from '~/types/cart'

export function useCart() {
  // API
  const { $api } = useNuxtApp()

  // FETCH
  const {
    data: cart,
    pending,
    error,
    refresh,
  } = useApiFetch<Cart>('/cart', {
    key: 'cart',
  })

  // ACTIONS
  async function add(payload: AddToCartPayload): Promise<void> {
    cart.value = await $api<Cart>('/cart/items', {
      method: 'POST',
      body: payload,
    })
  }

  async function update(
    itemId: string,
    payload: UpdateCartItemPayload,
  ): Promise<void> {
    cart.value = await $api<Cart>(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: payload,
    })
  }

  async function remove(itemId: string): Promise<void> {
    cart.value = await $api<Cart>(`/cart/items/${itemId}`, {
      method: 'DELETE',
    })
  }

  // PUBLIC API
  return {
    cart: readonly(cart),
    pending,
    error,
    refresh,

    add,
    update,
    remove,
  }
}