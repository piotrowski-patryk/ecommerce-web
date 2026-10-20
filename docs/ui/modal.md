# Modal

Wspólny `Modal` z `src/components/ui/modal.tsx` służy do krótkich informacji i
potwierdzeń wymagających skupienia uwagi. Interaktywne przykłady znajdują się na
`/design-system`.

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/buttons";
import { Modal } from "@/components/ui/modal";

export function DeleteAddress() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Usuń adres</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Usunąć adres?"
        description="Tej czynności nie można cofnąć."
        actions={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Anuluj</Button>
            <Button variant="destructive" onClick={() => {/* logika ekranu */}}>Usuń</Button>
          </>
        }
      >
        <p>Adres zostanie usunięty z profilu.</p>
      </Modal>
    </>
  );
}
```

## API

| Prop | Znaczenie | Domyślnie |
| --- | --- | --- |
| `open` | Stan kontrolowany przez ekran. | wymagany |
| `onClose` | Prośba o zamknięcie; ekran ustawia `open` na `false`. | wymagany |
| `title` | Widoczny i dostępny tytuł dialogu. | wymagany |
| `description` | Opcjonalny opis powiązany z dialogiem. | brak |
| `children` | Przewijana treść. | wymagany |
| `actions` | Opcjonalna stopka z akcjami, najlepiej ze wspólnych `Button`. | brak |
| `showCloseButton` | Pokazuje przycisk zamknięcia. | `true` |
| `closeOnEscape` | Czy Escape wywołuje `onClose`. | `true` |
| `closeOnBackdrop` | Czy kliknięcie poza panelem wywołuje `onClose`. | `true` |
| `className` | Dodatkowa klasa panelu. | brak |

Komponent używa natywnego elementu `<dialog>` otwieranego przez `showModal()`.
Po otwarciu przenosi focus na tytuł, izoluje nawigację klawiaturą w dialogu i
blokuje przewijanie tła. Po zamknięciu zwraca focus do poprzedniego elementu,
jeśli nadal istnieje. Escape i kliknięcie w tło nie zamykają okna samodzielnie:
wywołują `onClose`, po czym ekran aktualizuje `open`.

Podczas zapisu ekran może wyłączyć zamknięcie przez Escape i tło oraz ukryć
przycisk zamknięcia. Wtedy powinien zapewnić inny sposób zakończenia lub
komunikat o postępie. Treść, przyciski i logika biznesowa należą do ekranu.

Przy długiej treści przewija się środkowa część okna, a nagłówek i stopka
pozostają widoczne. Animacja otwarcia wyłącza się przy `prefers-reduced-motion`.
