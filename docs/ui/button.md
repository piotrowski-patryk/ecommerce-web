# Button

Wspólny `Button` z `src/components/ui/buttons.tsx` służy do akcji w aplikacji,
także w stopce modala. Domyślny typ to `button`, dzięki czemu nie wysyła
formularza przypadkowo.

```tsx
import { Button } from "@/components/ui/buttons";

<Button variant="solid" size="lg" onClick={save}>
  Zapisz zmiany
</Button>
```

## API

| Prop | Wartości | Domyślnie |
| --- | --- | --- |
| `variant` | `solid`, `outline`, `soft`, `subtle`, `ghost`, `link`, `destructive` | `solid` |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `type` | `button`, `submit`, `reset` | `button` |

Komponent przyjmuje natywne właściwości przycisku, w tym `onClick`, `disabled`,
`aria-*`, `data-*`, `ref` i `className`. Typ `ButtonProps` jest eksportowany.
Przycisk z samą ikoną powinien mieć dostępną nazwę przez `aria-label`.

W formularzu ustaw `type="submit"` jawnie. Obsługę zdarzeń i stanu formularza
umieść w komponencie klienckim. `variant="link"` zmienia wygląd, lecz zachowuje
semantykę przycisku; do nawigacji użyj linku.
