# Button — z Vue do Reacta

Komponent znajduje się w `src/components/ui/button.tsx`. Ma trzy sekcje:
importy, typy oraz funkcję komponentu. Stosuje wspólny
[wzór komponentów UI](./component-pattern.md).
`ButtonProps` łączy własne propsy przez `&` z `React.ComponentProps<"button">`
z Reacta. Typ ten dodaje standardowe atrybuty przycisku, w tym
`children`, `disabled` i `onClick`. Funkcja odczytuje własne propsy osobno,
a pozostałe przekazuje do `<button>` przez `...rest`.

Style znajdują się w tym samym pliku `button.tsx`, w obiekcie `styles`.
Mapy `variant`, `color` i `size` oraz style `block` i `loading`
odpowiadają propsom komponentu.
Każdy rozmiar jest obiektem: `base` opisuje tekst i odstępy,
a `square` padding dla wartości `true` i `false`. Rozmiar ikon wybiera Icon.
Button nie potrzebuje biblioteki do wariantów.

## Jak czytać komponent

| Vue | React w tym komponencie |
| --- | --- |
| Deklaracja propsów przez `defineProps` | Typ `ButtonProps` opisuje akceptowane propsy; sam typ nie sprawdza ich podczas działania aplikacji |
| Wartości domyślne propsów | `type = "button"`, `size = "md"`, `color = "primary"` i `variant = "solid"` w parametrach funkcji |
| `<template>` | JSX zwracany przez `return` |
| Domyślny `<slot />` | `{children}` |
| `v-if="icon"` | Icon sam zwraca `null`, gdy nie otrzyma nazwy |
| `:class="..."` | `className={[...klasy].join(" ")}` — połączenie wybranych klas w jeden tekst |
| `:disabled="isDisabled"` | `disabled={isDisabled}` w wywołaniu Buttona |
| `@click="handleClick"` | `onClick={handleClick}` |

Destrukturyzacja odczytuje konkretne wartości z obiektu propsów.
Dzięki temu w funkcji piszemy `size` zamiast `props.size`.
Znak `?` w typie, np. `icon?: string`, oznacza prop opcjonalny.
`ReactNode` oznacza treść, którą React może wyrenderować, np. tekst lub elementy JSX.

Zapis `{...rest}` przekazuje pozostałe propsy do `<button>`, podobnie do
`v-bind="$attrs"` w Vue. Własne propsy (`icon`, `trailingIcon`, `size`, `color`,
`variant`, `square`) odczytujemy osobno, więc nie trafiają do HTML.

Obiekt `styles` zawiera:

- `base` — wspólny wygląd, kursor, przejścia, grubość obrysu fokusu i stan wyłączenia.
- `icon` — wspólne style ikon.
- `block` — klasy dla `true` i `false`: pełna szerokość i wyśrodkowanie treści razem z ikonami.
- `loading` — klasy dla `true` i `false`: obrót lewej ikony podczas ładowania.
- `variant` — wspólne klasy wariantów: `solid` ma `text-inverted`, `outline`
  używa `bg-transparent`. `soft` i `ghost` nie wymagają wspólnych klas. `outline` i `subtle`
  mają obrys w wybranym kolorze motywu o kryciu odpowiednio 50% i 25%.
- `color` — `base` z kolorem obrysu fokusu oraz klasy konkretnego wariantu,
  np. `styles.color.primary.outline`.
- `size` — ustawienia danego rozmiaru: tekst, odstępy
  oraz warunkowy padding dla `square`.

Funkcja dobiera klasy bez zmiennej pomocniczej:

```tsx
className={[
  styles.base,
  styles.variant[variant],
  styles.color[color].base,
  styles.color[color][variant],
  styles.size[size].base,
  styles.size[size].square[square ? "true" : "false"],
  styles.block[block ? "true" : "false"],
  className,
].join(" ")}
```

`styles.color[color].base` wybiera wspólny kolor obrysu fokusu, np.
`outline-primary/25`. Grubość `focus-visible:outline-3` jest we wspólnym
`styles.base`, więc nie powtarzamy jej w każdym wariancie.

`styles.color[color][variant]` to zwykłe odczytanie z obiektu JavaScript.
Przy `color="primary"` i `variant="outline"` oznacza `styles.color.primary.outline`.
Tablica zbiera klasy, a `.join(" ")` oddziela je spacjami. Opcjonalny
`className` bez wartości nie doda tekstu `undefined`. Sam `.join()` nie usuwa
sprzecznych klas; kolejność wpisów w `className` nie gwarantuje ich nadpisania.

Rozmiary tekstu, odstępów i ikon oparto na
[Button z Nuxt UI v4](https://github.com/nuxt/ui/blob/v4/src/theme/button.ts).
Kolory pochodzą z globalnego `src/styles/theme.css`. To zgodność
tych stylów i opisanych poniżej propsów, a nie pełne API `UButton`:
komponent nie dodaje `loadingAuto`, avatarów ani grup przycisków. Przycisk z samą ikoną
automatycznie korzysta z równego paddingu przez `square`.

Kolory przycisku korzystają wyłącznie z istniejących zmiennych globalnego
motywu `src/styles/theme.css`, importowanego przez `src/styles/index.css`.
Używamy czytelnych klas Tailwinda odpowiadających kolorom z `@theme`:

| Prop `color` | Zmienna CSS | Przykładowa klasa |
| --- | --- | --- |
| `primary` | `--color-primary` | `bg-primary` |
| `secondary` | `--color-secondary` | `bg-secondary` |
| `success` | `--color-success` | `bg-success` |
| `info` | `--color-info` | `bg-info` |
| `warning` | `--color-warning` | `bg-warning` |
| `error` | `--color-error` | `bg-error` |

Wariant `solid` używa `text-inverted`, odpowiadającego `--text-color-inverted`.
Pozostałe warianty używają koloru wybranego propem, np. `text-primary`.
Obrys fokusu też korzysta z tego koloru przy kryciu 25%, np. `outline-primary/25`.
Jak w [Nuxt UI](https://github.com/nuxt/ui/blob/v4/src/theme/button.ts), `outline`
ma obrys `ring-primary/50`, a `subtle` delikatniejszy `ring-primary/25`.
Focus klawiatury wzmacnia ich obrys do `focus-visible:ring-primary`.

W hover i active zmienia się krycie wybranego koloru z `@theme`, jak
w kolorowych wariantach Nuxt UI. Przykład dla `color="primary"`:

| Wariant | Tło | Hover, active i disabled |
| --- | --- | --- |
| `solid` | `bg-primary` | `bg-primary/75` |
| `outline` | Przezroczyste | `bg-primary/10` |
| `soft`, `subtle` | `bg-primary/10` | `bg-primary/15` |
| `ghost` | Bez własnego tła | `bg-primary/10` |

Końcówki `/75`, `/10` i `/15` określają krycie samego koloru tła.
Tekst i ikony pozostają nieprzezroczyste. Nadal korzystamy z tego samego
koloru z motywu, np. `--color-primary`, bez odwołań do palet `blue` czy `slate`.
`disabled`, `loading` i timeout używają tego samego koloru tła co hover
danego wariantu. Nie zmniejszamy krycia całego przycisku.
Nazwy klas są zapisane w całości w obiekcie. Zmienne z `light-dark()` dobierają
kolory w jasnym i ciemnym motywie.

```tsx
<Button color="success" label="Zapisano" />
<Button color="error" variant="outline" label="Usuń" />
```

## Padding przycisku z samą ikoną

`square` oznacza równy padding z każdej strony. Domyślna wartość zależy od
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
<Button icon="menu">Menu</Button>                       // md: 10 px poziomo, 6 px pionowo
<Button icon="menu" aria-label="Menu" />                // md: 6 px z każdej strony
<Button icon="menu" square={false} aria-label="Menu" /> // zwykły padding
```

Możesz jawnie ustawić `square={true}` lub skrótowo `square`, również przy
obecności `children`. Dla `xs` równy padding wynosi 4 px, `sm` i `md` 6 px,
a `lg` i `xl` 8 px przy domyślnej skali Tailwinda.
Padding wybieramy bezpośrednio z obiektu rozmiaru:

```tsx
styles.size[size].square[square ? "true" : "false"]
```

Dla `size="md"` i `square={true}` odczytujemy `styles.size.md.square.true`.
Wybieramy wyłącznie jeden zestaw paddingów, dzięki czemu klasy nie konkurują
ze sobą w CSS.

## Rozmiar ikon

Ustawienia tekstu, odstępów i paddingu znajdują się razem, np.:

```tsx
md: {
  base: "text-sm gap-1.5",
  square: {
    true: "p-1.5",
    false: "px-2.5 py-1.5",
  },
},
```

Button przekazuje rozmiar przez `size`, a dodatkowe style przez `className`:

```tsx
<Icon
  name={trailingIcon}
  size={size}
  className={styles.icon.base}
/>
```

`styles.icon.base` zawiera `shrink-0`, więc ikona nie kurczy się w układzie
flex. Icon wybiera rozmiar z własnego `styles.size`, bez powielania mapy w Buttonie.
Własnej ikonie przekazanej przez `children` ustawiasz `size` bezpośrednio;
pozostałe style przekazujesz w jej `className`, podobnie jak w samodzielnym Iconie.
Zwykłe elementy treści, np. licznik w `<span>`, pozostają bez zmian.
Nie używamy selektorów opartych na atrybutach danych.

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
<Button icon="shopping-bag">Dodaj do koszyka</Button>
```

W React:

```tsx
import Button from "@/components/ui/button";

export default function Example() {
  return <Button icon="shopping-bag">Dodaj do koszyka</Button>;
}
```

Treść między znacznikami trafia do `children`. Może zawierać również elementy:

```tsx
<Button variant="soft">
  Koszyk
  <span className="rounded-full bg-muted px-2">3</span>
</Button>
```

## Label, block i loading

`label` jest skrótem dla zwykłej etykiety. Treść `children` ma pierwszeństwo,
podobnie jak domyślny slot w Nuxt UI:

```tsx
<Button label="Zapisz" />
<Button label="Zapasowa etykieta">Własna treść</Button>
```

Treść renderujemy przez `{children ?? label}`. Operator `??` wybiera `label`,
gdy `children` jest `null` lub `undefined`. Nie dodajemy elementu opakowującego
ani dodatkowych stylów. `children` może nadal zawierać dowolny JSX.

```tsx
<Button label="Dodaj do koszyka" block />
<Button label="Menu" block trailingIcon="menu" />
<Button label="Zapisywanie" loading />
```

`block` ustawia `w-full justify-center`. Prawa ikona pozostaje bezpośrednio
za `label` lub `children`, z odstępem `gap` wybranego rozmiaru. `loading` zastępuje lewą ikonę
obrotową ikoną `loader-circle`, zachowuje etykietę i prawą ikonę oraz
ustawia `disabled`. Dodatkowo `aria-busy` informuje o trwającym ładowaniu.
Stan `loading` przekazuje rodzic, np. z `useState`; komponent nie uruchamia
ładowania automatycznie po kliknięciu.

Style stanów są jawnymi obiektami:

```tsx
block: {
  true: "w-full justify-center",
  false: "",
},
loading: {
  true: "animate-spin",
  false: "",
},
```

Przycisk otrzymuje klasy z `styles.block`, a wyłącznie lewa ikona — z
`styles.loading`. Klucz wybieramy operatorem `warunek ? "true" : "false"`.
Prawa ikona pozostaje nieruchoma podczas ładowania.

## Timeout

`timeout?: number` określa czas blokady w sekundach. Odliczanie zaczyna się
po zamontowaniu komponentu. Przykład: `<Button timeout={5} label="Kontynuuj" />`.
Podczas blokady dodatkowy `<span>` między lewą ikoną a `children` lub `label`
pokazuje kolejno `5`, `4`, `3`, `2`, `1`. Po zakończeniu licznik znika.
Podczas odliczania lewą ikonę zastępuje nieruchomy zegar `clock`, również
gdy ustawiono `loading`. Po zakończeniu wraca spinner lub ikona z `icon`.

Przekazujemy pełne, nieujemne sekundy. Brak wartości lub `0` wyłącza timeout.
`timeout` określa czas początkowy; zmiana propa nie restartuje odliczania. Ponowne zamontowanie
komponentu rozpoczyna nowe odliczanie. Timer jest sprzątany przy zmianie
licznika lub odmontowaniu, a po zakończeniu nie jest ponownie uruchamiany.
Zakończenie timeoutu nie usuwa blokady wynikającej z `disabled` lub `loading`.

## Disabled i kursor

Aktywny przycisk ma `cursor-pointer`. `disabled`, `loading` oraz trwający timeout ustawiają
natywny atrybut `disabled`, który blokuje kliknięcie i wysłanie formularza
przez ten przycisk. Stan wyłączenia ma `cursor-not-allowed` oraz takie samo
tło jak hover, również po najechaniu na wyłączony przycisk. Kolory tekstu
i obrysu wynikają z wariantu. Dotychczasowe style hover i active pozostają zachowane.

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

  return <Button onClick={handleClick}>Kliknięcia: {count}</Button>;
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
| `loading` | Spinner i wyłączenie przycisku | `false` |
| `timeout` | Czas blokady w sekundach (`number`), odliczany od zamontowania | `0` |
| `icon`, `trailingIcon` | Nazwa ikony przed lub za treścią | — |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `color` | `primary`, `secondary`, `success`, `info`, `warning`, `error` | `primary` |
| `square` | Równy padding z każdej strony | Automatycznie przy braku treści |
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
<Button icon="menu" aria-label="Menu" />
```

## Ikony

Ikony `menu`, `shopping-bag` i `loader-circle` są importowane statycznie w `icon.tsx`.
Dzięki temu Icon jest zwykłą funkcją i działa również w komponentach
klienckich. Dodając ikonę, dodaj plik SVG, jego import oraz wpis w mapie `icons`.
Nieznana nazwa ikony powoduje, że ikona nie jest renderowana.

## Użycie w modalu

Wspólny Button służy również do akcji w stopce Modala. Dla akcji destrukcyjnych
ustaw `color="error"`, zachowując domyślny wariant `solid`. Przykłady:
`src/components/design-system/modal-showcase.tsx` oraz [Modal](./modal.md).
