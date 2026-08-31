<script setup lang="ts">
interface DropdownItem {
  label: string
  to?: string
  icon?: string
  disabled?: boolean
}

defineProps<{
  items: DropdownItem[][]
}>()

const open = ref(false)
const dropdown = useTemplateRef('dropdown')

const close = (event: MouseEvent) => {
  if (!dropdown.value?.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', close)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', close)
})
</script>

<template>
  <div
    ref="dropdown"
    class="relative"
    @click.stop="open = !open"
  >
    <slot />

    <div
      v-if="open"
      class="absolute top-full left-0 z-50 mt-2 max-w-[calc(100vw-2rem)] min-w-44 rounded-md border border-default bg-default p-1 shadow-md"
      @click.stop
    >
      <template
        v-for="(group, index) in items"
        :key="index"
      >
        <hr
          v-if="index"
          class="my-1 border-0 border-t border-muted"
        >

        <Button
          v-for="item in group"
          :key="item.label"
          :to="item.to"
          :disabled="item.disabled"
          variant="ghost"
          color="neutral"
          size="lg"
          class="w-full justify-start rounded-sm px-2"
          @click="open = false"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
            size="lg"
          />

          <span>{{ item.label }}</span>
        </Button>
      </template>
    </div>
  </div>
</template>