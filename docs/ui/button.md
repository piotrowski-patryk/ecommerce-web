# Button

```tsx
import Button from "@/components/ui/button";

<Button variant="primary" size="lg" fullWidth>
  Dodaj do koszyka
</Button>
```

## Props

| Prop | Wartości | Domyślnie |
| --- | --- | --- |
| `variant` | `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link` | `primary` |
| `size` | `sm`, `md`, `lg`, `icon` | `md` |
| `fullWidth` | `boolean` | `false` |
| `loading` | `boolean` | `false` |
| `type` | `button`, `submit`, `reset` | `button` |

Komponent przyjmuje też natywne propsy `<button>`, m.in. `disabled`, `name`,
`value`, `formAction`, `aria-*`, `data-*`, `onClick` oraz `ref`. Typ `ButtonProps`
jest eksportowany. React 19 przekazuje `ref` jako zwykły prop, bez `forwardRef`.

`loading` pokazuje spinner, ustawia `aria-busy` i blokuje przycisk przez natywne
`disabled`. Treść pozostaje jego dostępną nazwą. Przycisk z samą ikoną powinien
mieć `aria-label`, a dekoracyjne SVG — `aria-hidden="true"`. Animacja uwzględnia
preferencję ograniczonego ruchu. Focus klawiatury ma widoczny obrys.

## Next.js i formularze

Komponent nie korzysta z hooków ani API przeglądarki. Można renderować go na
serwerze, również wewnątrz formularzy z Server Actions. Aby wysłać formularz,
ustaw `type="submit"`.

Obsługę zdarzeń i stan formularza definiuj w komponencie klienckim:

```tsx
"use client";

import { useFormStatus } from "react-dom";
import Button from "@/components/ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending}>
      Zapisz zmiany
    </Button>
  );
}
```

`SubmitButton` umieść wewnątrz formularza. `onClick` i inne funkcje obsługujące
zdarzenia przekazuj z komponentu klienckiego.

## Wspólny wzorzec dla komponentów UI

Warianty są zdefiniowane za pomocą `tv` z `tailwind-variants` w `button-variants.ts`, a ich typy
wynikają z `VariantProps<typeof buttonVariants>`. Kolejne komponenty mogą
korzystać z tego samego wzorca: `tv({ base, variants, defaultVariants })` + `VariantProps`.

`tailwind-variants` łączy klasy i usuwa konflikty narzędzi Tailwinda przez
`tailwind-merge`. `className` przekazany do przycisku
ma pierwszeństwo, np. `className="rounded-full px-8"`.

Do nawigacji używaj `next/link` i eksportowanej funkcji stylów:

```tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";

<Link
  href="/"
  className={buttonVariants({
    variant: "outline",
    size: "sm",
    className: "rounded-full",
  })}
>
  Wróć do sklepu
</Link>
```

`variant="link"` zmienia wygląd przycisku, ale zachowuje semantykę `<button>`.
Sam `next/link` nie obsługuje propsów `disabled` i `loading` przycisku.

Podgląd wariantów i stanów: `/design-system`.
