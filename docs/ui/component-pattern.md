# Wzór komponentu UI

Plik komponentu ma trzy sekcje: importy, typy i funkcję. W nim opisujemy
własne propsy oraz widok. Natywne atrybuty typujemy bezpośrednio przez
`React.ComponentProps`, bez osobnego importu typu. Rozbudowane style umieszczamy obok komponentu w pliku
`nazwa.styles.ts`, gdy potrzebny jest osobny plik na style.

## Przykład do skopiowania

Poniższy komponent karty renderuje element `<section>`. Można zapisać go
jako `src/components/ui/card.tsx`:

```tsx
// 2. Typy
export type CardProps = React.ComponentProps<"section"> & {
  heading: string;
};

// 3. Funkcja
export default function Card({ heading, children, ...rest }: CardProps) {
  return (
    <section {...rest}>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}
```

Przykład użycia:

```tsx
import Card from "@/components/ui/card";

export default function Example() {
  return (
    <Card heading="Dostawa" id="delivery" className="rounded-lg border p-4">
      Przesyłkę otrzymasz w ciągu dwóch dni.
    </Card>
  );
}
```

`Card` jest przykładem w dokumentacji; plik `card.tsx` nie jest częścią
wdrożenia Buttona. Rzeczywistym komponentem stosującym wzór jest `button.tsx`.

## Odpowiedniki z Vue

| Vue | Nasz wzór w React |
| --- | --- |
| Własne propsy w `defineProps` | Obiekt `{ heading: string }` połączony przez `&` z typem atrybutów HTML |
| Atrybuty elementu HTML | Pierwszy argument, np. `"section"`, dobiera ich typy |
| `<template>` | JSX wewnątrz `return` |
| `<slot />` | `{children}` |
| `v-bind="$attrs"` | `{...rest}` |

`React.ComponentProps<"button"> & { ... }` czytamy: „standardowe propsy
przycisku oraz własne propsy”. Dla innego elementu zmieniamy nazwę na `"input"`, `"a"`
lub `"section"` i deklarujemy jego własne propsy. Atrybuty specyficzne dla
danego elementu, np. `href` dla `"a"`, są dobierane automatycznie.
Jeśli własny prop zmienia typ natywnego atrybutu na niezgodny, usuwamy ten
atrybut przez `Omit` przed połączeniem typów. `React.ComponentProps` uwzględnia
`ref`, który w React 19 przekazujemy do elementu HTML przez `...rest`.

W React wszystkie te wartości są propsami. `rest` jest zwykłym obiektem
JavaScript, który zbiera wartości niewyciągnięte osobno. To podobny efekt
do przekazywania `$attrs` w Vue, ale nie automatyczny mechanizm Vue.
Własne propsy odczytujemy osobno, aby nie trafiały jako atrybuty HTML.

Nie trzeba dodawać `"use client"` do każdego komponentu. Dyrektywę dodajemy
na granicy kodu wymagającego stanu, hooków lub zdarzeń w przeglądarce,
np. w rodzicu obsługującym kliknięcie. Funkcji obsługujących zdarzenia
nie przekazujemy bezpośrednio przez granicę z serwera do klienta.

Prosty komponent potrzebuje tylko pliku `.tsx`. Osobny `.styles.ts`
warto dodać, gdy mapy klas i wariantów zaczynają przesłaniać jego widok.
