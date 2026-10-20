# Licznik ilości produktu

`QuantityCounter` z `@/components/ui/quantity-counter` służy do wyboru ilości na
stronie produktu i przy pozycji koszyka. Przykłady stanów znajdują się na
`/design-system`.

```tsx
"use client";

import { useState } from "react";
import { QuantityCounter } from "@/components/ui/quantity-counter";

export function ProductQuantity() {
  const [quantity, setQuantity] = useState(1);

  return (
    <QuantityCounter
      value={quantity}
      min={1}
      max={5}
      onValueChange={setQuantity}
    />
  );
}
```

| Prop | Znaczenie |
| --- | --- |
| `value` | Aktualna ilość; wymagana liczba całkowita. |
| `onValueChange` | Otrzymuje proponowaną ilość z dozwolonego zakresu. |
| `min` | Minimalna ilość, domyślnie `1`. |
| `max` | Opcjonalna maksymalna ilość. |
| `disabled` | Blokuje oba przyciski. |
| `pending` | Pokazuje spinner na przygaszonej liczbie, blokuje oba przyciski podczas zapisu i oznacza grupę `aria-busy`. |
| `label` | Dostępna nazwa grupy i kontekst nazw przycisków; domyślnie „Ilość produktu”. W koszyku podaj nazwę pozycji. |
| `className` | Dodatkowa klasa kontenera. |

Ekran przechowuje `value` i odpowiada za zapis koszyka, obsługę błędów oraz
dostosowanie ilości, gdy zewnętrzny limit spadnie poniżej bieżącej wartości.
Komponent nie koryguje wtedy wartości sam i nie zgłasza zmian poza zakresem.
Usuwanie produktu jest osobną akcją. W koszyku ustaw `pending` na czas zapisu,
aby zapobiec równoległym, sprzecznym aktualizacjom.

Oba przyciski mają `type="button"`, więc nie wysyłają formularza. Wymagane są
poprawne granice (`min <= max`, jeśli podano `max`) i całkowita wartość ilości.
Serwer musi niezależnie potwierdzić dostępny stan magazynowy.
