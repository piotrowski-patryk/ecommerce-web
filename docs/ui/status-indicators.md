# Znaczniki statusu, liczniki i kropki

Wspólne komponenty z `@/components/ui/status-indicators` prezentują krótką
informację w zamówieniach, nawigacji i powiadomieniach. Ich warianty i stany
można obejrzeć na `/design-system`.

| Komponent | Zastosowanie | Najważniejsze propsy |
| --- | --- | --- |
| `StatusBadge` | Status z czytelnym tekstem lub krótka etykieta. | `label`, opcjonalnie `variant`, `withDot`, `className`. |
| `CountBadge` | Liczba przy elemencie nawigacji lub tytule. | `value`, `label`, opcjonalnie `max`, `showZero`, `variant`, `className`. |
| `StatusDot` | Samotna kropka oznaczająca nowość. | Wymagany opis kontekstowy `label`, opcjonalnie `variant`, `className`. |

Warianty semantyczne to `neutral`, `info`, `success` i `attention`. Ekran wybiera
wariant oraz przekazuje tekst lub wartość. Komponenty nie mapują statusów
biznesowych i nie pobierają danych. `attention` odpowiada m.in. czerwonej kropce
nieprzeczytanego powiadomienia; nie oznacza automatycznie błędu.

```tsx
import {
  CountBadge,
  StatusBadge,
  StatusDot,
} from "@/components/ui/status-indicators";

<StatusBadge label="Wysłano" variant="info" withDot />
<StatusBadge label="Dostarczono" variant="success" withDot />
<StatusBadge label="DOM" />

<CountBadge value={3} label="Zapisane produkty" />
<CountBadge value={125} max={99} label="Zapisane produkty" />
<StatusDot label="Nieprzeczytane powiadomienie" />
```

`CountBadge` domyślnie niczego nie renderuje przy `value={0}`. `showZero` pokazuje
zero, jeśli jest potrzebne w danym kontekście. Gdy `value` przekracza `max`,
wizualnie widać np. `99+`, a czytnik ekranu otrzymuje pełną wartość, np.
„Zapisane produkty: 125”. `max` domyślnie wynosi `99`. `value` musi być nieujemną
bezpieczną liczbą całkowitą, a `max` dodatnią bezpieczną liczbą całkowitą.

Tekst `StatusBadge` jest zawsze widoczny. Jego opcjonalna kropka jest dekoracyjna
i pomijana przez czytnik ekranu. Samotny `StatusDot` wymaga `label` opisującego
znaczenie w konkretnym miejscu; nie używaj etykiet typu „czerwona kropka”.
Licznik i kropka nie są osobnymi przyciskami. Jeśli znajdują się w linku lub
przycisku, ekran odpowiada za dostępność całej interakcji. Nie dodawaj drugiego
opisu tej samej liczby w etykiecie linku. Statusy nie wymagają dodatkowego
`aria-live`; ekran może dodać komunikat o zmianie stanu, gdy jest to potrzebne.

Znaczniki mają `max-width: 100%` i mogą zawijać długi tekst. W układzie obok
tytułu użyj kontenera z zawijaniem oraz `min-width: 0` na tytule, żeby elementy
nie nachodziły na siebie przy małej szerokości.
