<script setup lang="ts">
interface TableHeadingItem {
  // CONTENT
  label: string
  value?: string | number

  // SEMANTICS
  as?: 'h2' | 'h3' | 'h4' | 'span'

  // STYLE
  align?: 'left' | 'center' | 'right'
  hidden?: boolean

  // LAYOUT
  mobile?: 'main' | 'top-end' | 'bottom-start' | 'bottom-end' | 'hidden'
}

interface TableMedia {
  // CONTENT
  src: string
  alt: string
}

interface TableValue {
  // VALUE
  amount: number | string
  currency?: string
}

interface TableSelectItem {
  // CONTENT
  label: string
  value: string | number
}

interface TableSelect {
  // CONTENT
  value: string | number
  items: TableSelectItem[]
  label?: string

  // STATE
  disabled?: boolean

  // ACTION
  onChange?: (value: string | number | undefined) => void
}

interface TableAction {
  // CONTENT
  label: string
  icon?: string

  // LINK
  to?: string | Record<string, unknown>

  // STATE
  disabled?: boolean
  loading?: boolean

  // STYLE
  color?: 'primary' | 'secondary' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'ghost' | 'link'

  // ACTION
  onClick?: () => void
}

interface TableCell {
  // CONTENT
  label?: string
  description?: string
  to?: string | Record<string, unknown>
  media?: TableMedia
  value?: TableValue
  select?: TableSelect
  action?: TableAction
}

interface TableRow {
  // CONTENT
  key: string | number
  cells: TableCell[]
}

interface Props {
  // CONTENT
  heading?: TableHeadingItem[]
  body?: TableRow[]
}

const {
  heading = [],
  body = [],
} = defineProps<Props>()
</script>

<template>
  <table class="w-full">
    <thead :class="heading.some(item => item.mobile) && 'block sm:table-header-group'">
      <tr
        class="border-b border-default text-sm font-semibold text-muted uppercase sm:h-14"
        :class="heading.some(item => item.mobile) && 'block sm:table-row'"
      >
        <th
          v-for="(item, itemIndex) in heading"
          :key="itemIndex"
          scope="col"
          class="py-0"
          :class="[
            {
              left: 'text-left',
              center: 'text-center',
              right: 'text-right',
            }[item.align ?? 'left'],
            item.mobile === 'main' && 'block sm:table-cell',
            item.mobile && item.mobile !== 'main' && 'hidden sm:table-cell',
          ]"
        >
          <component
            :is="item.as ?? 'span'"
            :class="[
              item.hidden && 'sr-only',
              item.as && item.as !== 'span' && 'flex h-14 items-center gap-2 font-display text-lg font-semibold text-strong normal-case',
            ]"
          >
            {{ item.label }}

            <span
              v-if="item.value !== undefined"
              class="text-muted"
            >
              {{ item.value }}
            </span>
          </component>
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-default">
      <tr
        v-for="row in body"
        :key="row.key"
        :class="heading.some(item => item.mobile)
          && 'grid grid-cols-[5rem_minmax(0,1fr)_auto] grid-rows-[auto_auto] content-between gap-x-4 py-5 sm:table-row'"
      >
        <td
          v-for="(item, itemIndex) in row.cells"
          :key="itemIndex"
          :class="[
            {
              left: 'text-left',
              center: 'text-center',
              right: heading[itemIndex]?.mobile === 'bottom-start'
                ? 'text-left sm:text-right'
                : 'text-right',
            }[heading[itemIndex]?.align ?? 'left'],
            !heading[itemIndex]?.mobile && 'py-5 align-middle',
            heading[itemIndex]?.mobile === 'main' && 'contents sm:table-cell sm:py-5 sm:align-middle',
            heading[itemIndex]?.mobile === 'top-end' && 'col-start-3 row-start-1 self-start sm:table-cell sm:py-5 sm:align-middle',
            heading[itemIndex]?.mobile === 'bottom-start' && 'col-start-2 row-start-2 self-end sm:table-cell sm:py-5 sm:align-middle',
            heading[itemIndex]?.mobile === 'bottom-end' && 'col-start-3 row-start-2 w-20 justify-self-end self-end sm:table-cell sm:py-5 sm:align-middle',
            heading[itemIndex]?.mobile === 'hidden' && 'hidden sm:table-cell sm:py-5 sm:align-middle',
          ]"
        >
          <Select
            v-if="item.select"
            :model-value="item.select.value"
            :items="item.select.items"
            :disabled="item.select.disabled"
            :aria-label="item.select.label"
            size="md"
            placeholder=""
            @update:model-value="item.select.onChange"
          />

          <Button
            v-else-if="item.action"
            :to="item.action.disabled || item.action.loading ? undefined : item.action.to"
            :icon="item.action.icon"
            :label="item.action.icon ? undefined : item.action.label"
            :disabled="item.action.disabled"
            :loading="item.action.loading"
            :color="item.action.color ?? 'primary'"
            :variant="item.action.variant ?? 'solid'"
            :aria-label="item.action.label"
            size="md"
            @click="item.action.onClick"
          />

          <span
            v-else-if="item.value"
            class="font-semibold tabular-nums text-strong"
          >
            {{
              typeof item.value.amount === 'number'
                ? $n(item.value.amount, {
                    style: 'currency',
                    currency: item.value.currency ?? 'PLN',
                  })
                : item.value.amount
            }}
          </span>

          <div
            v-else
            :class="heading[itemIndex]?.mobile === 'main'
              ? 'contents sm:flex sm:items-center sm:gap-3'
              : 'flex min-w-56 items-center gap-3'"
          >
            <img
              v-if="item.media"
              :src="item.media.src"
              :alt="item.media.alt"
              class="size-20 shrink-0 rounded-sm"
              :class="heading[itemIndex]?.mobile === 'main' && 'row-span-2 self-center'"
            >

            <div
              class="min-w-0"
              :class="heading[itemIndex]?.mobile === 'main' && 'col-start-2 row-start-1 self-start sm:self-center'"
            >
              <NuxtLinkLocale
                v-if="item.to"
                :to="item.to"
                class="line-clamp-2 text-base font-semibold text-strong hover:underline"
              >
                {{ item.label }}
              </NuxtLinkLocale>

              <span
                v-else
                class="text-base font-semibold text-strong"
              >
                {{ item.label }}
              </span>

              <span
                v-if="item.description"
                class="mt-1 block text-sm text-muted"
              >
                {{ item.description }}
              </span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>