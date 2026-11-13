# Stany list

Komponenty z `@/components/ui/list-states` prezentują wynik decyzji ekranu o stanie
listy. Nie pobierają danych, nie wywołują żądań i nie przechowują poprzednich
wyników. Przykłady są dostępne na `/design-system`.

## Wybór widoku

`ListState` otrzymuje `itemCount`, `isLoading`, `hasError` i opcjonalne
`hasActiveFilters`. Wyświetla dokładnie jeden widok główny:

| Warunek | Widok |
| --- | --- |
| `itemCount > 0` | Dane przekazane jako `children` |
| Brak danych i `isLoading` | `loadingState` |
| Brak danych i `hasError` | `errorState` |
| Brak danych i aktywne wyszukiwanie lub filtry | `noResultsState` |
| Brak danych i brak filtrów | `emptyState` |

Kolejność jest celowa. Przy odświeżaniu ekran powinien zachować ostatnie
poprawne dane w swojej warstwie stanu. Gdy `itemCount > 0` i `isLoading`, lista
pozostaje widoczna wraz z krótkim komunikatem `refreshingLabel`. Jeśli takie
odświeżenie się nie uda, `hasError` pokazuje `refreshErrorLabel` nad poprzednimi
danymi. Opcjonalne `onRetry` dodaje przycisk ponowienia. Ekran musi przekazywać
do `itemCount` liczbę elementów, które rzeczywiście renderuje jako `children`.

```tsx
<ListState
  itemCount={visibleProducts.length}
  isLoading={isLoading}
  hasError={Boolean(error)}
  hasActiveFilters={Boolean(query || selectedFilters.length)}
  onRetry={reloadProducts}
  loadingState={<ListSkeleton variant="product" label="Ładowanie produktów…" />}
  emptyState={<ListFeedback kind="empty" title="Brak produktów" />}
  noResultsState={<ListFeedback kind="no-results" title="Brak wyników" />}
  errorState={
    <ListFeedback
      kind="error"
      title="Nie udało się pobrać produktów"
      action={{ label: "Spróbuj ponownie", onClick: reloadProducts }}
    />
  }
>
  <ProductGrid products={visibleProducts} />
</ListState>
```

Funkcje `onRetry` i `action.onClick` przekazuj z komponentu klienckiego. Jeśli
`ListState` ma otrzymać elementy z serwera, można przekazać je jako `children`.

## Komponenty prezentacyjne

- `ListFeedback` przyjmuje `kind` (`empty`, `no-results`, `error`), `title`,
  opcjonalne `description`, dekoracyjne `icon` i `action`. Akcja może być
  przyciskiem z `onClick` albo linkiem z `href`. Używaj linku dla nawigacji i
  przycisku dla operacji, takich jak czyszczenie filtrów lub ponowienie.
- `ListSkeleton` ma wariant `row`, `product` lub `order`. `count` określa liczbę
  pozycji (od 1 do 12; nieprawidłowa wartość przywraca 3), a `label` opisuje
  ładowaną listę dla czytnika ekranu.
- `resolveListView` jest czystą funkcją z tą samą kolejnością priorytetów co
  `ListState`. Może posłużyć ekranowi, jeśli potrzebuje tej decyzji poza JSX.

Komunikaty są po polsku i powinny odnosić się do konkretnej listy. Szkielety są
dekoracyjne, a animacja wyłącza się przy `prefers-reduced-motion`. `ListFeedback`
używa `role="status"` dla pustej listy i braku wyników oraz `role="alert"` dla
błędu. Przy odświeżaniu istniejących danych komunikat ma analogicznie rolę
statusu albo alertu. Akcje są dostępne z klawiatury i mają widoczny fokus.

Wzorzec obejmuje lokalne listy w ekranach. Granice tras Next.js, takie jak
`loading.tsx` i `error.tsx`, są odrębnym mechanizmem.
