<script setup lang="ts">
interface StateAction {
  label: string
  to: string
  variant?: 'solid' | 'outline' | 'ghost'
}

type StateColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'neutral'

const {
  icon,
  code,
  title,
  description,
  actions,
  color = 'primary',
  headingLevel = 1,
  mode = 'standalone',
} = defineProps<{
  icon?: string
  code?: number
  title: string
  description?: string
  actions?: StateAction[]
  color?: StateColor
  headingLevel?: 1 | 2 | 3
  mode?: 'standalone' | 'embedded'
}>()

const headingTag = computed(() => `h${headingLevel}`)

const colorClasses: Record<StateColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  error: 'text-error',
  neutral: 'text-muted',
}
</script>

<template>
  <section>
    <div
      class="flex flex-col items-center py-10 text-center text-pretty"
      :class="mode === 'standalone' ? 'container' : 'w-full'"
    >
      <Icon
        v-if="icon"
        :name="icon"
        size="2xl"
        :class="colorClasses[color]"
      />

      <span
        v-if="code"
        :class="colorClasses[color]"
        class="font-display text-4xl leading-tight font-medium lg:text-5xl"
      >
        {{ code }}
      </span>

      <component
        :is="headingTag"
        class="max-w-[35ch] font-display text-strong"
        :class="[
          (icon || code) && 'mt-4',
          mode === 'standalone'
            ? 'text-3xl font-semibold lg:text-4xl'
            : 'text-xl font-semibold lg:text-2xl',
        ]"
      >
        {{ title }}
      </component>

      <p
        v-if="description"
        class="mt-3 max-w-xl text-muted"
        :class="mode === 'standalone' ? 'text-lg lg:text-xl' : 'text-base lg:text-lg'"
      >
        {{ description }}
      </p>

      <div
        v-if="actions?.length"
        class="mt-8 flex w-full flex-wrap justify-center gap-3"
      >
        <Button
          v-for="action in actions"
          :key="action.to"
          :to="action.to"
          :label="action.label"
          :variant="action.variant"
          :color="color"
          size="xl"
          class="w-full sm:w-auto"
        />
      </div>
    </div>
  </section>
</template>