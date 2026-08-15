import type { Product } from '~/types/product'

export function useProduct(slug: MaybeRef<string>) {
  // FETCH
  const {
    data: product,
    pending,
    error,
    refresh,
  } = useApiFetch<Product>(
    () => `/products/${toValue(slug)}`,
  )

  // PUBLIC API
  return {
    product,
    pending,
    error,
    refresh,
  }
}