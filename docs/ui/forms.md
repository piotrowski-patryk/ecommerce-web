# Pola formularzy

Przykłady wszystkich wdrożonych kontrolek i ich stanów znajdują się na `/design-system`.
Zakres wynika z makiet sklepu: logowanie, wyszukiwanie, kod promocyjny, wybór dostawy,
płatności, rozmiaru i koloru.

## Użycie w ekranach aplikacji

Importuj komponenty bezpośrednio z `@/components/ui/input` i
`@/components/ui/radio-group`. `form-showcase.tsx` służy do prezentacji wariantów
w design systemie; nie kopiuj z niego struktury ani stylów do ekranów sklepu.

| Potrzeba ekranu | Komponent | Konfiguracja |
| --- | --- | --- |
| E-mail w logowaniu | `Input` | `type="email"`, `name`, `label`, opcjonalnie `leadingIcon` |
| Hasło w logowaniu | `Input` | `type="password"`; przycisk pokaż/ukryj jest wbudowany |
| Wyszukiwanie produktów | `Input` | `type="search"`, `name`, `label` |
| Kod promocyjny | `Input` | `type="text"`, `name`, `label` |
| Dostawa i płatność | `RadioGroup` | `variant="card"`, `name`, `legend`, `options` |
| Rozmiar i kolor | `RadioGroup` | odpowiednio `variant="size"` lub `variant="color"` |

Formularz odpowiada za wartości, reguły walidacji i wysyłkę danych. Przekaż do
komponentu `error`, gdy dana kontrolka ma pokazać błąd. Dla nowej kontrolki lub
wariantu rozszerz wspólną warstwę UI, dodaj przykład na `/design-system` i opisz
jej użycie tutaj.

## `Input`

```tsx
import { Input } from "@/components/ui/input";

<Input
  type="email"
  name="email"
  label="Adres e-mail"
  autoComplete="email"
  required
/>
```

`Input` przyjmuje natywne propsy pola HTML, w tym `name`, `value`, `defaultValue`,
`onChange`, `ref`, `disabled`, `readOnly`, `required` i atrybuty `aria-*`.
`label` jest wymagany. `hint` i `error` są opcjonalne; ich tekst jest powiązany
z polem przez `aria-describedby`. `error` ustawia też `aria-invalid`.

| Typ | Zastosowanie | Walidacja |
| --- | --- | --- |
| `email` | Logowanie adresem e-mail | Natywny format e-maila i `required`, jeśli formularz wymaga wartości. |
| `password` | Logowanie | `required`; zasady długości i złożoności ustala formularz lub serwer. |
| `search` | Wyszukiwanie produktów | Zwykle opcjonalne; ograniczenia wyszukiwania ustala formularz. |
| `text` | Kod promocyjny | Poprawność kodu potwierdza logika sklepu lub serwer. |

`leadingIcon` i `trailingIcon` służą do opcjonalnych ikon dekoracyjnych. Pole działa
bez ikon. Dla `type="password"` prawa strona jest zarezerwowana na wbudowany
przycisk pokaż/ukryj hasło, więc `trailingIcon` jest niedozwolony. Przycisk ma
`type="button"`, jest dostępny z klawiatury i nie zmienia wpisanej wartości.
Ikona dekoracyjna nie zastępuje tekstowej etykiety.

Komponent **pokazuje** błąd, ale nie narzuca reguł biznesowych ani momentu
walidacji. Formularz przekazuje `error` po sprawdzeniu danych. Walidacja po stronie
serwera pozostaje konieczna niezależnie od walidacji w przeglądarce.

## `RadioGroup`

```tsx
import { RadioGroup } from "@/components/ui/radio-group";

<RadioGroup
  name="size"
  legend="Rozmiar"
  variant="size"
  options={[
    { value: "S", label: "S" },
    { value: "M", label: "M" },
  ]}
  required
/>
```

Warianty wyglądu to `card` (dostawa i płatność), `size` (rozmiar) i `color`
(próbki kolorów). Wszystkie zachowują natywną semantykę grupy pól `radio`:
jedną wybraną wartość pod wspólnym `name`, nawigację strzałkami i zaznaczanie
klawiaturą. Grupa przyjmuje `defaultValue` albo parę `value` / `onValueChange`.
`required` wymaga wyboru w formularzu; `disabled` może dotyczyć całej grupy
lub pojedynczej opcji. `error` pokazuje komunikat i oznacza opcje jako błędne.
Każdy kolor ma tekstową nazwę w `label`, nawet jeśli wizualnie widać tylko próbkę.

`readOnly` dotyczy pól tekstowych; natywna grupa `radio` nie ma takiego stanu.
Przyciski formularza należą do osobnego komponentu `Button`. Licznik ilości oraz
filtry rozwijane nie należą do tego zestawu.
Licznik ilości jest osobną wspólną kontrolką UI opisaną w
[`quantity-counter.md`](quantity-counter.md).
