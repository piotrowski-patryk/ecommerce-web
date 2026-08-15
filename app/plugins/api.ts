export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: `${config.public.apiUrl}/api`,
    credentials: 'include',
  })

  return {
    provide: {
      api,
    },
  }
})