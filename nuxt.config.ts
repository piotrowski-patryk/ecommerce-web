import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@pinia/nuxt',
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
    '~/assets/styles/main.css',
  ],

  vite: {
    plugins: [
      tailwindcss(),
      svgLoader(),
    ],
  },

  typescript: {
    strict: true,
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'theme',
  },

  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },

  devtools: {
    enabled: false,
  },

  i18n: {
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',

    locales: [
      { code: 'pl', language: 'pl-PL', name: 'Polski', file: 'pl.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
  },
})