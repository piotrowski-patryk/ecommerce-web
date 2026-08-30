import type {
  Product,
  ProductMedia,
  ProductVariant,
} from '~/types/product'

type CartProductVariant = Omit<ProductVariant, 'media'> & {
  media: ProductMedia | null
}

export interface Cart {
  id: string | null
  status: string
  expiresAt: string
  items: CartItem[]
}

export interface CartItem {
  id: string
  quantity: number
  product: Omit<Product, 'variants'> & {
    variant: CartProductVariant
  }
}

export interface AddToCartPayload {
  variantId: string
  quantity: number
}
