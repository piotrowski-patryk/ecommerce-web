# Karty i wiersze informacyjne

`InfoCard` i `InfoRow` z `src/components/ui/info-card.tsx` służą do prezentacji
danych profilu, dostawy, płatności i zamówienia. Przykłady wariantów są na
`/design-system`. Wiersze w karcie powinny być jej bezpośrednimi dziećmi.

```tsx
import { InfoCard, InfoRow } from "@/components/ui/info-card";

<InfoCard>
  <InfoRow kind="link" href="/orders" title="Moje zamówienia" icon={<OrdersIcon />} />
  <InfoRow title="Numer zamówienia" trailing="NEO-2094" />
</InfoCard>
```

## API

| Komponent | Właściwość | Znaczenie |
| --- | --- | --- |
| `InfoCard` | `children` | Wiersze we wspólnej ramce. |
| `InfoCard` | `divided` | Separatory między wierszami; domyślnie `true`. |
| `InfoCard` | `className` | Dodatkowa klasa kontenera. |
| `InfoRow` | `title` | Wymagany, widoczny tytuł. |
| `InfoRow` | `description` | Opcjonalny tekst pomocniczy pod tytułem. |
| `InfoRow` | `icon` albo `image` | Opcjonalny element po lewej; nie można przekazać obu naraz. |
| `InfoRow` | `trailing` | Opcjonalna informacja po prawej, np. data, cena lub tekst statusu. |
| `InfoRow` | `kind` | `static` (domyślnie), `link` lub `button`. |
| `InfoRow` | `href` | Wymagany tylko dla `kind="link"`. |
| `InfoRow` | `onClick`, `disabled` | Akcja i opcjonalny stan wyłączenia tylko dla `kind="button"`. |
| `InfoRow` | `showChevron` | Dla linku domyślnie `true`, dla przycisku `false`; nie dotyczy wiersza statycznego. |
| `InfoRow` | `aria-label` | Opcjonalna nazwa linku lub przycisku, gdy widoczny tekst nie opisuje działania dostatecznie jasno. |

`icon` jest dekoracją i jest ukrywany przed czytnikami ekranu. `image` zachowuje
własny tekst alternatywny: użyj `alt=""`, jeśli tytuł wiersza już w pełni
opisuje zdjęcie, albo krótkiego opisu, jeśli zdjęcie wnosi dodatkową informację.
`trailing` służy wyłącznie do treści nieinteraktywnej. Nie umieszczaj linków ani
przycisków w `icon`, `image` lub `trailing` wiersza interaktywnego: cały wiersz
jest już jednym linkiem albo przyciskiem.

Wiersz statyczny nie ma hover, kursora wskazującego ani focusu. Link korzysta
z `next/link` i działa także z klawiatury. Przycisk ma `type="button"`, więc
nie wysyła przypadkowo formularza. Oba warianty interaktywne pokazują focus
na całej powierzchni wiersza. `title`, `description`, `trailing` i docelowy
adres lub obsługę akcji dostarcza ekran.

```tsx
"use client";

import { InfoCard, InfoRow } from "@/components/ui/info-card";

export function AddressCard({ onSave }: { onSave: () => void }) {
  return (
    <InfoCard divided={false}>
      <InfoRow
        kind="button"
        title="Zapisz adres dostawy"
        trailing="Zapisz"
        onClick={onSave}
      />
    </InfoCard>
  );
}
```

Komponent z obsługą `onClick` musi być użyty wewnątrz granicy klienta, jak w
przykładzie. Wiersze statyczne i linki mogą pozostać renderowane po stronie
serwera. Jeśli ekran umożliwia *wybór* dostawy lub płatności, użyj `RadioGroup`
opisanego w [`forms.md`](forms.md). `InfoRow` pokazuje wybrany wynik lub prowadzi
do ekranu zmiany, ale nie jest kontrolką wyboru.
