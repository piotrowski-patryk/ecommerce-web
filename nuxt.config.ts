import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: [
    '~/assets/css/main.css',
  ],

  runtimeConfig: {
    apiBaseUrl: '',
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'theme',
  },

  i18n: {
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',
    customRoutes: 'meta',

    locales: [
      {
        code: 'pl',
        language: 'pl-PL',
        name: 'Polski',
        files: [
          'pl/common.json',
          'pl/error.json',
          'pl/cart.json',
          'pl/checkout.json',
        ],
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        files: [
          'en/common.json',
          'en/error.json',
          'en/cart.json',
          'en/checkout.json',
        ],
      },
    ],
  },

  vite: {
    plugins: [
      tailwindcss(),
      svgLoader(),
    ],
  },

  devtools: {
    enabled: false,
  },
})
