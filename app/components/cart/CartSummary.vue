<script setup lang="ts">
interface SummaryAction {
  // BUTTON
  type?: 'button' | 'submit' | 'reset'
  form?: string

  // LINK
  to?: string | Record<string, unknown>

  // ACTION
  onClick?: () => void

  // STATE
  disabled?: boolean
  loading?: boolean

  // STYLE
  color?: 'primary' | 'secondary' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'ghost' | 'link'
}

interface SummaryValue {
  // VALUE
  amount: number | string
  currency?: string
}

interface SummaryItem {
  // CONTENT
  label: string
  value?: SummaryValue
  action?: SummaryAction

  // SEMANTICS
  as?: 'p' | 'span'

  // STYLE
  size?: 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'strong' | 'success' | 'error'
}

interface SummaryHeading {
  // CONTENT
  label: string

  // SEMANTICS
  as?: 'h2' | 'h3' | 'h4'
}

interface SummaryBody {
  // CONTENT
  [key: string]: SummaryItem[]
}

interface Props {
  // CONTENT
  heading?: SummaryHeading
  body?: SummaryBody
}

const {
  heading,
  body = {},
} = defineProps<Props>()
</script>

<template>
  <div class="divide-y divide-default">
    <component
      :is="heading?.as ?? 'h2'"
      v-if="heading"
      class="flex h-14 items-center font-display text-lg font-semibold text-strong"
    >
      {{ heading.label }}
    </component>

    <div
      v-for="(block, blockName) in body"
      :key="blockName"
      class="space-y-4 py-5 last:pb-0"
    >
      <dl
        v-if="block.some(item => item.value)"
        class="space-y-4"
      >
        <template
          v-for="(item, itemIndex) in block"
          :key="itemIndex"
        >
          <div
            v-if="item.value"
            class="flex items-center justify-between gap-4"
            :class="[
              { sm: 'text-sm', md: 'text-base', lg: 'text-lg', xl: 'text-xl' }[item.size ?? 'md'],
              { normal: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold' }[item.weight ?? 'normal'],
              item.color && { default: 'text-default', muted: 'text-muted', strong: 'text-strong', success: 'text-success', error: 'text-error' }[item.color],
            ]"
          >
            <dt :class="!item.color && 'text-muted'">
              {{ item.label }}
            </dt>

            <dd
              class="tabular-nums"
              :class="[
                !item.weight && 'font-medium',
                !item.color && 'text-default',
              ]"
            >
              {{
                typeof item.value.amount === 'number'
                  ? $n(item.value.amount, {
                      style: 'currency',
                      currency: item.value.currency ?? 'PLN',
                    })
                  : item.value.amount
              }}
            </dd>
          </div>
        </template>
      </dl>

      <template
        v-for="(item, itemIndex) in block"
        :key="itemIndex"
      >
        <Button
          v-if="item.action"
          :type="item.action.type ?? 'button'"
          :form="item.action.form"
          :to="item.action.disabled || item.action.loading ? undefined : item.action.to"
          :disabled="item.action.disabled"
          :loading="item.action.loading"
          :color="item.action.color ?? 'primary'"
          :variant="item.action.variant ?? 'solid'"
          :size="item.size ?? 'xl'"
          :weight="item.weight ?? 'medium'"
          class="w-full"
          @click="item.action.onClick"
        >
          {{ item.label }}
        </Button>

        <component
          :is="item.as ?? 'p'"
          v-else-if="!item.value"
          :class="[
            { sm: 'text-sm', md: 'text-base', lg: 'text-lg', xl: 'text-xl' }[item.size ?? 'md'],
            { normal: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold' }[item.weight ?? 'normal'],
            { default: 'text-default', muted: 'text-muted', strong: 'text-strong', success: 'text-success', error: 'text-error' }[item.color ?? 'default'],
          ]"
        >
          {{ item.label }}
        </component>
      </template>
    </div>
  </div>
</template>