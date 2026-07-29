<script setup lang="ts">
const { t } = useI18n()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="py-6">
    <div class="container">
      <p class="text-sm">
        © {{ currentYear }}

        <a
          href="https://github.com/Xdellta"
          target="_blank"
          rel="author noopener noreferrer"
          aria-label="Patryk Piotrowski - GitHub"
          class="text-primary hover:underline"
        >
          Patryk Piotrowski
        </a>.

        {{ t('footer.copyright') }}
      </p>
    </div>
  </footer>
</template>