export interface Cart {
  id: string | null
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  currency: string
}

export interface CartItem {
  id: string
  product: {
    id: string
    name: string
    slug: string
    image: string
  }
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface AddToCartPayload {
  variantId: string
  quantity: number
}

export interface UpdateCartItemPayload {
  quantity: number
}