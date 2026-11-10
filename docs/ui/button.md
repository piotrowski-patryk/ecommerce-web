# Button — z Vue do Reacta

Komponent znajduje się w `src/components/ui/button.tsx`. Ma trzy sekcje:
importy, typy oraz funkcję komponentu. Stosuje wspólny
[wzór komponentów UI](./component-pattern.md).
Przykłady wszystkich kolorów i wariantów, rozmiarów, ikon oraz stanów
znajdują się na stronie `/design-system` w sekcji „Przyciski systemowe”.
`ButtonProps` łączy własne propsy przez `&` z `React.ComponentProps<"button">`
z Reacta. Typ ten dodaje standardowe atrybuty przycisku, w tym
`children`, `disabled` i `onClick`. Funkcja odczytuje własne propsy osobno,
a pozostałe przekazuje do `<button>` przez `...rest`.

Style znajdują się w tym samym pliku `button.tsx`, w konfiguracji CVA `buttonStyles`.
Mapy `color` i `variant` zawierają stringi klas. Mapa `size` określa rozmiar tekstu, odstępy i bok przycisku kwadratowego. Osobna mapa
`square` określa proporcje i padding.
Stałe klasy przycisku, ikon i licznika pozostają w JSX. Rozmiar ikon wybiera Icon.
Button używa CVA do składania klas Tailwinda. Wariant jest wymagany, a domyślny kolor to `primary`.

## Jak czytać komponent

| Vue | React w tym komponencie |
| --- | --- |
| Deklaracja propsów przez `defineProps` | Typ `ButtonProps` opisuje akceptowane propsy; sam typ nie sprawdza ich podczas działania aplikacji |
| Wartości domyślne propsów | `type = "button"` i `size = "md"` w parametrach funkcji |
| `<template>` | JSX zwracany przez `return` |
| Domyślny `<slot />` | `{children}` |
| `v-if="leadingIcon"` | Icon sam zwraca `null`, gdy nie otrzyma nazwy |
| `:class="..."` | `className` ze szablonem tekstowym łączy wybrane klasy w jeden tekst |
| `:disabled="isDisabled"` | `disabled={isDisabled}` w wywołaniu Buttona |
| `@click="handleClick"` | `onClick={handleClick}` |

Destrukturyzacja odczytuje konkretne wartości z obiektu propsów.
Dzięki temu w funkcji piszemy `size` zamiast `props.size`.
Znak `?` w typie, np. `leadingIcon?: string`, oznacza prop opcjonalny.
`ReactNode` oznacza treść, którą React może wyrenderować, np. tekst lub elementy JSX.

Zapis `{...rest}` przekazuje pozostałe propsy do `<button>`, podobnie do
`v-bind="$attrs"` w Vue. Własne propsy (`leadingIcon`, `trailingIcon`, `size`, `color`,
`variant`, `square`) odczytujemy osobno, więc nie trafiają do HTML.

Obiekt `styles` zawiera:

- `color` — kolor tekstu i obrysu fokusu, np. `text-primary outline-primary/25`.
- `variant` — sposób użycia koloru przez `currentColor`: tło, obrys i stany.
- `size` — wielkość tekstu, odstępy i bok przycisku kwadratowego.
- `square` — proporcje i padding, wspólne dla wszystkich rozmiarów.
- `block` — pełna szerokość dla `true`, brak dodatkowych klas dla `false`.

Funkcja dobiera klasy bez zmiennej pomocniczej:

```tsx
<button
  className={`
    rounded-md font-medium inline-flex items-center justify-center cursor-pointer
    transition-colors focus-visible:outline-3
    disabled:cursor-not-allowed aria-disabled:cursor-not-allowed
    disabled:opacity-75 aria-disabled:opacity-75
    ${styles.color[color]}
    ${styles.variant[variant]}
    ${styles.size[size]}
    ${styles.square[square ? "true" : "false"]}
    ${styles.block[block ? "true" : "false"]}
    ${className}
  `}
>
```

`currentColor` oznacza bieżący kolor tekstu przycisku, ustawiany przez `color`.
Wariant `solid` korzysta z niego jako tła. Wewnętrzny `<span>` otrzymuje
`contents text-inverted`, dzięki czemu treść i ikony mają kolor odwrócony,
a tło przycisku zachowuje wybrany kolor. W pozostałych wariantach span ma
wyłącznie `contents` i dziedziczy kolor. `contents` nie tworzy dodatkowego pola
układu: treść nadal korzysta z układu flex i odstępów przycisku.

Opcjonalny `className` bez wartości nie doda tekstu `undefined`.
Szablon tekstowy nie usuwa sprzecznych klas; kolejność wpisów w `className`
nie gwarantuje ich nadpisania.

Rozmiary tekstu, odstępów i ikon oparto na
[Button z Nuxt UI v4](https://github.com/nuxt/ui/blob/v4/src/theme/button.ts).
Kolory pochodzą z globalnego `src/styles/theme.css`. To zgodność
tych stylów i opisanych poniżej propsów, a nie pełne API `UButton`:
komponent nie dodaje `loadingAuto`, avatarów ani grup przycisków. Przycisk z samą ikoną
automatycznie otrzymuje styl `square`.

Prop `color` wybiera klasę tekstu z globalnego motywu, np. `text-success`.
Wariant `solid` ustawia kolor tekstu przez `text-inverted!`, a `compoundVariants`
dobiera klasę tła dla wybranego koloru, np. `bg-success`. Pozostałe warianty
korzystają z koloru tekstu przez `currentColor`.
Warianty `outline` i `subtle` mają wewnętrzną obwódkę `inset-ring` w kolorze
tekstu, odpowiednio o kryciu 50% i 25%. Przy `focus-visible` obwódka ma pełne
krycie. We wszystkich wariantach obrys fokusu ma grubość 3 px, krycie 25%
i zerowy odstęp. W `solid` obrys używa koloru tła, a w pozostałych wariantach
koloru tekstu (`currentColor`).

| Wariant | Tło | Tło po najechaniu |
| --- | --- | --- |
| `solid` | Wybrany kolor | Wybrany kolor / 90% dla aktywnego przycisku |
| `outline`, `ghost` | Przezroczyste | Wybrany kolor / 10% |
| `soft`, `subtle` | Wybrany kolor / 10% | Wybrany kolor / 20% |

Końcówki `/90`, `/10` i `/20` określają krycie koloru tła.
Atrybut `disabled` zmniejsza krycie całego przycisku do 75%.
Nazwy klas są zapisane w całości w obiekcie. Zmienne z `light-dark()` dobierają
kolory w jasnym i ciemnym motywie.

```tsx
<Button variant="solid" color="success" label="Zapisano" />
<Button color="error" variant="outline" label="Usuń" />
```

## Proporcje przycisku z samą ikoną

`square` zachowuje równy padding w obu osiach. Domyślna wartość zależy od
`children`, czyli odpowiednika domyślnego slotu Vue:

```tsx
square = !label && (children == null || typeof children === "boolean" || children === "")
```

To zwykły warunek JavaScript: brak treści (`null` lub `undefined`), wartość
logiczna (React nie wyświetla jej jako treści) lub pusty tekst włącza `square`,
jeśli nie ma też niepustego `label`.
Liczba `0` jest treścią i zachowuje zwykły padding. Komponent nie analizuje
zawartości elementów JSX; dla ikony przekazanej przez `children` ustaw `square`.

```tsx
<Button color="primary" variant="solid" leadingIcon="menu">Menu</Button>
<Button color="primary" variant="solid" leadingIcon="menu" aria-label="Menu" />
<Button color="primary" variant="solid" leadingIcon="menu" square={false} aria-label="Menu" />
```

Możesz jawnie ustawić `square`, również przy obecności `children`.
W trybie `square` padding z `size` jest taki sam w obu osiach.
Dla `square={false}` padding poziomy wynosi `0.8em`.
Opcja `block` niezależnie ustawia pełną szerokość kontenera.

## Rozmiar ikon

Button przekazuje rozmiar przez `size`, a dodatkowe style przez `className`:

```tsx
<Icon
  name={trailingIcon}
  size={size}
  className="shrink-0"
/>
```

`shrink-0` jest zapisane bezpośrednio w JSX, więc ikona nie kurczy się w układzie
flex. Icon wybiera rozmiar z własnego `styles.size`, bez powielania mapy w Buttonie.
Własnej ikonie przekazanej przez `children` ustawiasz `size` bezpośrednio;
pozostałe style przekazujesz w jej `className`, podobnie jak w samodzielnym Iconie.
Zwykłe elementy treści, np. licznik w `<span>`, pozostają bez zmian.
Rozmiar ikon zależy od `size`.

| `size` przycisku | Rozmiar obu ikon |
| --- | --- |
| `xs` | `1rem` (16 px przy bazie 16 px) |
| `sm` | `1rem` (16 px) |
| `md` — domyślny | `1.25rem` (20 px) |
| `lg` | `1.25rem` (20 px) |
| `xl` | `1.5rem` (24 px) |

## Domyślny slot

W Vue:

```vue
<Button color="primary" variant="solid" leadingIcon="shopping-bag">Dodaj do koszyka</Button>
```

W React:

```tsx
import Button from "@/components/ui/button";

export default function Example() {
  return <Button color="primary" variant="solid" leadingIcon="shopping-bag">Dodaj do koszyka</Button>;
}
```

Treść między znacznikami trafia do `children`. Może zawierać również elementy:

```tsx
<Button color="primary" variant="soft">
  Koszyk
  <span className="rounded-full bg-muted px-2">3</span>
</Button>
```

## Label, block i loading

`label` jest skrótem dla zwykłej etykiety. Treść `children` ma pierwszeństwo,
podobnie jak domyślny slot w Nuxt UI:

```tsx
<Button color="primary" variant="solid" label="Zapisz" />
<Button color="primary" variant="solid" label="Zapasowa etykieta">Własna treść</Button>
```

Treść renderujemy przez `{children ?? label}`. Operator `??` wybiera `label`,
gdy `children` jest `null` lub `undefined`. Nie dodajemy elementu opakowującego
ani dodatkowych stylów. `children` może nadal zawierać dowolny JSX.

```tsx
<Button color="primary" variant="solid" label="Dodaj do koszyka" block />
<Button color="primary" variant="solid" label="Menu" block trailingIcon="menu" />
```

`block` ustawia `w-full`. Treść przycisku jest zawsze domyślnie wyśrodkowana.
Stan zapisywania obsługuje ekran. Podaje ikonę, blokuje ponowne kliknięcie
i przekazuje `aria-busy`. Obrót `loader-circle` jest zapisany w SVG.

```tsx
<Button
  color="primary"
  variant="solid"
  label="Zapisz"
  icon={saving ? "loader-circle" : "shopping-bag"}
  disabled={saving}
  aria-busy={saving}
/>
```


## Timeout

`timeout?: number` określa czas blokady w sekundach. Odliczanie zaczyna się
po zamontowaniu komponentu. Przykład: `<Button color="primary" variant="solid" timeout={5} label="Kontynuuj" />`.
Podczas blokady dodatkowy `<span>` między lewą ikoną a `children` lub `label`
pokazuje kolejno `5`, `4`, `3`, `2`, `1`. Po zakończeniu licznik znika.
Podczas odliczania lewą ikonę zastępuje nieruchomy zegar `clock`.

Przekazujemy pełne, nieujemne sekundy. Brak wartości lub `0` wyłącza timeout.
`timeout` określa czas początkowy; zmiana propa nie restartuje odliczania. Ponowne zamontowanie
komponentu rozpoczyna nowe odliczanie. Timer jest sprzątany przy zmianie
licznika lub odmontowaniu, a po zakończeniu nie jest ponownie uruchamiany.
Zakończenie timeoutu nie usuwa blokady wynikającej z `disabled`.

## Disabled i kursor

Aktywny przycisk ma `cursor-pointer`. `disabled` ustawia
natywny atrybut `disabled`, który blokuje kliknięcie i wysłanie formularza
przez ten przycisk. Stan wyłączenia ma `cursor-not-allowed`, krycie 75%
i standardowe tło danego wariantu, również po najechaniu. Kolory tekstu
i obrysu wynikają z wariantu. Przykłady wszystkich nieaktywnych wariantów
znajdują się w sekcji „Nieaktywne warianty” na `/design-system`.

Samo `aria-disabled` opisuje stan i włącza style, ale natywnie nie blokuje
kliknięć — do wyłączenia tego przycisku używaj `disabled`.

## Kliknięcie

W Vue `@click` nasłuchuje zdarzenia komponentu. W React `onClick` jest propsem
z funkcją. Button przekazuje ją do natywnego `<button>`.
`onClick` jest opcjonalny — nie musisz go podawać w każdym wywołaniu.

```tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/button";

export default function Counter() {
  // useState przechowuje stan komponentu, podobnie do ref w Vue.
  // count to bieżąca wartość, a setCount ustawia nową wartość.
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <Button color="primary" variant="solid" onClick={handleClick}>Kliknięcia: {count}</Button>;
}
```

`handleClick` jest zdefiniowane w tym samym przykładzie. Przekazujemy funkcję
przez `onClick={handleClick}`. Zapis `onClick={handleClick()}` wywołałby ją
już podczas renderowania.

`"use client"` oznacza granicę kodu obsługującego interakcje w Next.js.
Umieszczamy ją w komponencie takim jak `Counter`, który potrzebuje stanu
i obsługi kliknięcia. Button ma również własną dyrektywę `"use client"`, ponieważ
obsługuje stan i timer odliczania. Może być renderowany przez komponenty
serwerowe i klienckie. Funkcji `onClick` nie
przekazujemy bezpośrednio z komponentu serwerowego do komponentu klienckiego.

## Props

| Prop | Wartości | Domyślnie |
| --- | --- | --- |
| `children` | Treść przycisku (`ReactNode`), ma pierwszeństwo przed `label` | — |
| `label` | Etykieta tekstowa | — |
| `block` | Pełna szerokość | `false` |
| `timeout` | Czas blokady w sekundach (`number`), odliczany od zamontowania | `0` |
| `leadingIcon`, `trailingIcon` | Nazwa ikony przed lub za treścią | — |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `color` | `primary`, `secondary`, `success`, `info`, `warning`, `error` | `primary` |
| `square` | Równy padding w obu osiach | Automatycznie przy braku treści |
| `variant` | `solid`, `outline`, `soft`, `subtle`, `ghost` | `solid` |
| `type` | `button`, `submit`, `reset` | `button` |
| `disabled` | `boolean` | `false` |
| `className` | Własne klasy CSS | — |
| `aria-label` | Dostępna nazwa, np. dla przycisku z samą ikoną | — |
| `onClick` | Funkcja obsługująca kliknięcie | — |

Standardowe atrybuty HTML są dostępne przez `React.ComponentProps<"button">` i przekazywane
przez `...rest`; nie trzeba wypisywać ich pojedynczo w `ButtonProps`.

Przycisk nie wysyła formularza domyślnie. Do wysyłania ustaw `type="submit"`
i umieść go wewnątrz formularza z obsługą `action` lub `onSubmit`.
Button zawsze renderuje `<button>`.

Przycisk z samą ikoną musi mieć nazwę:

```tsx
<Button color="primary" variant="solid" leadingIcon="menu" aria-label="Menu" />
```

## Ikony

Ikony `menu`, `shopping-bag` i `loader-circle` są importowane statycznie w `icon.tsx`.
Dzięki temu Icon jest zwykłą funkcją i działa również w komponentach
klienckich. Dodając ikonę, dodaj plik SVG, jego import oraz wpis w mapie `icons`.
Nieznana nazwa ikony powoduje, że ikona nie jest renderowana.

## Użycie w modalu

Wspólny Button służy również do akcji w stopce Modala. Dla akcji destrukcyjnych
ustaw `color="error"`, z wariantem `solid`. Przykłady:
`src/components/design-system/modal-showcase.tsx` oraz [Modal](./modal.md).
