<script setup lang="ts">
import { ref } from 'vue'

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
  <div @click="open" class="inline-block">
    <slot />
  </div>

  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex flex-col bg-background p-6"
    >
      <header class="flex items-center justify-between gap-4 pb-4">
        <h2 class="text-lg font-medium">
          {{ title }}
        </h2>

        <Button
          variant="ghost"
          size="sm"
          aria-label="Zamknij"
          @click="close"
        >
          <Icon name="close" />
        </Button>
      </header>

      <div class="min-h-0 flex-1 overflow-y-auto py-4">
        <slot name="body" />
      </div>
    </div>
  </Teleport>
</template>