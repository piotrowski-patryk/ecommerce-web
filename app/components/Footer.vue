<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="py-6">
    <div class="container">
      <p class="text-sm text-muted">
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

        {{ $t('common.footer.copyright') }}
      </p>
    </div>
  </footer>
</template>
