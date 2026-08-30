export interface Product {
  id: string
  publicId: string
  name: string
  status: string
  variants: ProductVariant[]
}

export interface ProductVariant {
  id: string
  publicId: string
  sku: string
  slug: string
  name: string
  stock: number
  status: string
  price: ProductPrice
  media?: ProductMedia[]
}

export interface ProductPrice {
  amount: string
  currency: string
  promo?: {
    regular: string
    lowest30: string
    endsAt: string | null
  }
}

export interface ProductMedia {
  url: string
  alt: string
}
