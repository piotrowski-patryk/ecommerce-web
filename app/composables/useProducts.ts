import type { Product } from '~/types/product'
import type { ApiResponse } from '~/types/api'

export function useProducts() {
  const response = useFetch<ApiResponse<Product[]>>('/api/products')

  const data = computed(() => response.data.value?.data)
  const meta = computed(() => response.data.value?.meta)

  return reactive({
    data,
    meta,
    status: response.status,
    error: response.error,
    refresh: response.refresh,
  })
}