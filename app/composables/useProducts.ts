import type { Product } from '~/types/product'

export function useProducts() {
  // FETCH
  const {
    data: products,
    pending,
    error,
    refresh,
  } = useApiFetch<Product[]>('/products')

  // PUBLIC API
  return {
    products,
    pending,
    error,
    refresh,
  }
}