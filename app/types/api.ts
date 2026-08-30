export interface ApiResponse<T> {
  success?: boolean
  data: T
  meta?: ApiMeta
  message?: string
}

export interface ApiMeta {
  total: number
  page: number
  perPage: number
  lastPage: number
}