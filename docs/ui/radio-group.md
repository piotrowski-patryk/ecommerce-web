# Wybór wariantu i opcji (`RadioGroup`)

`RadioGroup` z `@/components/ui/radio-group` jest wspólną kontrolką pojedynczego
wyboru dla rozmiaru, koloru, dostawy i płatności. Przykłady wszystkich wariantów
oraz stanów są na `/design-system`. Komponent renderuje natywne pola `radio`
wewnątrz `fieldset` z `legend`; wygląd nie zmienia semantyki formularza.

## API grupy

| Prop | Znaczenie |
| --- | --- |
| `name` | Wspólna nazwa pól radio, używana przy wysyłaniu formularza. |
| `legend` | Widoczna i dostępna nazwa grupy. |
| `options` | Lista obiektów `RadioOption`; `value` każdej opcji powinno być unikatowe w grupie. |
| `variant` | `card` (domyślny), `size` albo `color`. |
| `value` | Aktualny wybór kontrolowany przez ekran. Pusty ciąg `""` oznacza brak wyboru. |
| `onValueChange` | Otrzymuje `value` wybranej opcji. Komponent nie przechowuje własnego stanu wyboru w trybie kontrolowanym. |
| `defaultValue` | Wartość początkowa dla istniejących użyć niekontrolowanych; późniejsza zmiana tego propa nie aktualizuje wyboru. |
| `required` | Wymaga zaznaczenia jednej opcji przy natywnej walidacji formularza. |
| `disabled` | Blokuje całą grupę. Dostępność pojedynczej opcji ustawia się w `options`. |
| `hint` | Podpowiedź powiązana z opcjami przez `aria-describedby`. |
| `error` | Komunikat błędu i stan wizualny; regułę oraz moment walidacji ustala ekran. |
| `className` | Dodatkowa klasa kontenera `fieldset`. |

`RadioOption` zawiera wymagane `value` i `label`. Opcjonalne pola to `disabled`,
`description`, `icon`, `color` i `trailingText`:

| Wariant | Dane opcji |
| --- | --- |
| `size` | `label` jest tekstem widocznym na przycisku. |
| `color` | `color` określa kolor próbki, a `label` podaje jej nazwę dla czytnika ekranu. |
| `card` | `label` jest tytułem; `description` dodaje opis, `icon` dekoracyjną ikonę, a `trailingText` tekst po prawej, np. cenę. |

Opis i `trailingText` karty są powiązane z polem radio przez `aria-describedby`.
Ikona jest dekoracyjna, więc nie zastępuje tekstowej nazwy opcji. Wartość
`color` powinna być poprawnym kolorem CSS pochodzącym z danych wariantu.

## Wartość kontrolowana

W nowych ekranach przechowuj wybór w stanie ekranu i przekazuj `value` oraz
`onValueChange`. Dzięki temu zmiana wartości przez formularz lub dane produktu
od razu aktualizuje zaznaczenie.

```tsx
"use client";

import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";

export function ProductSize() {
  const [size, setSize] = useState("");

  return (
    <RadioGroup
      name="size"
      legend="Rozmiar"
      variant="size"
      value={size}
      onValueChange={setSize}
      options={[
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L", disabled: true },
      ]}
      error={size ? undefined : "Wybierz rozmiar."}
      required
    />
  );
}
```

Ten przykład pokazuje stan błędu od razu. W prawdziwym formularzu ekran może
przekazać `error` dopiero po próbie wysłania lub po interakcji użytkownika.
Reguły biznesowe i walidacja po stronie serwera należą do formularza.

## Zmiana dostępności

Jeżeli wybrana opcja stanie się niedostępna, ekran powinien zaktualizować
`options`, wyczyścić swoje `value` i, gdy wybór jest wymagany, przekazać `error`.
`RadioGroup` sam nie zmienia wartości formularza.

```tsx
const options = sizes.map((item) => ({
  value: item.id,
  label: item.name,
  disabled: !item.available,
}));

function updateAvailability(nextSizes: typeof sizes) {
  setSizes(nextSizes);
  if (size && !nextSizes.some((item) => item.id === size && item.available)) {
    setSize("");
    setSizeError("Wybrany rozmiar jest niedostępny. Wybierz ponownie.");
  }
}
```

Fragment zakłada, że `sizes`, `size`, `setSizes`, `setSize` i `setSizeError`
są stanem komponentu ekranu. Działający przykład jest na `/design-system`.

## Dostępność i stany

- Jedno `name` dla opcji zapewnia pojedynczy wybór. Strzałki zmieniają opcję,
  a klawiatura pomija natywnie zablokowane pola radio.
- `legend` nazywa grupę. Każda opcja, również próbka koloru, ma tekstowy `label`.
- Zaznaczenie ma obrys lub znacznik wyboru, więc nie opiera się wyłącznie na kolorze.
  Focus ma osobny widoczny obrys.
- `disabled` na opcji uniemożliwia jej zaznaczenie. `error` prezentuje błąd i
  wiąże jego komunikat z opcjami; komponent nie decyduje, kiedy go pokazać.
- Natywna grupa radio nie ma stanu `readOnly`. Jeśli ekran ma zabronić zmiany,
  użyj `disabled` i uwzględnij, że zablokowane pola nie są wysyłane z formularzem.
