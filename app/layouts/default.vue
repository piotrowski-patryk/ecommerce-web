<template>
  <div class="default-layout">
    <Header />

    <main class="main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.default-layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>