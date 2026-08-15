export const useApiFetch = createUseFetch((options) => {
  const { $api } = useNuxtApp()

  return {
    $fetch: $api,
    ...options,
  }
})