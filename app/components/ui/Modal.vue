<script setup lang="ts">
interface Modal {
  title?: string
}

defineProps<Modal>()

const isOpen = ref(false)

const open = () => { isOpen.value = true }
const close = () => { isOpen.value = false }

defineExpose({ open, close })
</script>

<template>
  <div class="inline-block" @click="open">
    <slot />
  </div>

  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-end justify-center bg-overlay/50 dark:bg-overlay/80 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      @click.self="close"
    >
      <div class="flex max-h-dvh w-full flex-col bg-default sm:max-h-[calc(100dvh-2rem)] sm:max-w-120 sm:rounded-lg sm:border sm:border-default sm:shadow-xl">
        <header class="flex items-center justify-between gap-5 border-b border-default p-5">
          <h2 class="min-w-0 font-display text-xl font-semibold text-strong">
            {{ title }}
          </h2>

          <Button
            icon="close"
            variant="ghost"
            color="neutral"
            size="xl"
            aria-label="Zamknij"
            @click="close"
          />
        </header>

        <div class="min-h-0 flex-1 overflow-y-auto p-5">
          <slot name="body" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
