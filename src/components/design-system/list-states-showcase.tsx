"use client";

import { useEffect, useRef, useState } from "react";
import { DesignSystemSection } from "@/components/design-system/section";
import { DesignSystemSpecimen } from "@/components/design-system/specimen";
import { Input } from "@/components/ui/input";
import { ListFeedback, ListSkeleton, ListState } from "@/components/ui/list-states";

type DemoMode = "loading" | "error" | "empty" | "no-results" | "data" | "refreshing" | "refresh-error";

const modes: { value: DemoMode; label: string }[] = [
  { value: "loading", label: "Ładowanie" },
  { value: "error", label: "Błąd" },
  { value: "empty", label: "Pusto" },
  { value: "no-results", label: "Brak wyników" },
  { value: "data", label: "Dane" },
  { value: "refreshing", label: "Odświeżanie" },
  { value: "refresh-error", label: "Błąd odświeżania" },
];

const sampleProducts = ["Koszulka z bawełny", "Kurtka na chłodniejsze dni", "Sweter z miękkiej dzianiny"];

export function ListStatesShowcase() {
  const [mode, setMode] = useState<DemoMode>("loading");
  const [retryCount, setRetryCount] = useState(0);
  const [query, setQuery] = useState("zielony płaszcz");
  const retryTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (retryTimer.current) window.clearTimeout(retryTimer.current);
  }, []);

  function selectMode(nextMode: DemoMode) {
    if (retryTimer.current) window.clearTimeout(retryTimer.current);
    retryTimer.current = null;
    setMode(nextMode);
  }

  function retry() {
    setRetryCount((count) => count + 1);
    setMode("refreshing");
    retryTimer.current = window.setTimeout(() => {
      retryTimer.current = null;
      setMode("data");
    }, 700);
  }

  return (
    <>
      <div className="border-t border-default pt-14">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">Design system / 06</p>
        <h2 className="text-4xl font-semibold text-strong sm:text-5xl">Stany list</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Jedna decyzja o tym, co pokazać, i osobne widoki dla pustej listy, ładowania oraz błędu.
          Makiety produktów, koszyka, zamówień i powiadomień wyznaczają rytm tych przykładów.
        </p>
      </div>

      <DesignSystemSection id="list-feedback-heading" title="Puste listy i brak wyników">
        <div className="overflow-hidden rounded-2xl border border-default">
          <DesignSystemSpecimen name="Koszyk" details="Brak produktów">
            <ListFeedback kind="empty" icon={<StateIcon name="bag" />} title="Twój koszyk jest pusty" description="Dodaj produkty, które chcesz zamówić. Pojawią się tutaj, gdy będziesz gotowy do zakupu." />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Kolekcja" details="Brak zapisanych produktów">
            <ListFeedback kind="empty" icon={<StateIcon name="heart" />} title="Nie masz jeszcze zapisanych produktów" description="Dotknij serca przy produkcie, aby łatwo wrócić do niego później." />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Zamówienia" details="Brak historii zakupów">
            <ListFeedback kind="empty" icon={<StateIcon name="receipt" />} title="Nie masz jeszcze zamówień" description="Po pierwszym zakupie znajdziesz tutaj jego status i szczegóły dostawy." />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Powiadomienia" details="Wszystko przeczytane">
            <ListFeedback kind="empty" icon={<StateIcon name="bell" />} title="Na razie nic nowego" description="Informacje o zamówieniach i nowych ofertach pojawią się tutaj." />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Wyszukiwanie" details="Osobny komunikat dla aktywnego filtra">
            <div className="space-y-4">
              <Input type="search" name="list-demo-search" label="Szukaj produktów" value={query} onChange={(event) => setQuery(event.target.value)} />
              {query ? (
                <ListFeedback kind="no-results" icon={<StateIcon name="search" />} title="Nie znaleźliśmy pasujących produktów" description={`Spróbuj zmienić hasło „${query}” lub usuń wybrane filtry.`} action={{ label: "Wyczyść wyszukiwanie", onClick: () => setQuery("") }} />
              ) : (
                <div className="rounded-xl border border-default bg-muted p-4 text-sm text-default" role="status">
                  <p className="font-medium">Wyszukiwanie wyczyszczone. Przykładowe produkty:</p>
                  <ul className="mt-2 list-inside list-disc">
                    {sampleProducts.map((product) => <li key={product}>{product}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </DesignSystemSpecimen>
        </div>
      </DesignSystemSection>

      <DesignSystemSection id="list-skeleton-heading" title="Szkielety list" description="Kształt odpowiada treści, która nadejdzie">
        <div className="overflow-hidden rounded-2xl border border-default">
          <DesignSystemSpecimen name="Siatka produktów" details="Dwie kolumny na wąskim ekranie">
            <ListSkeleton variant="product" count={4} label="Ładowanie produktów…" />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Wiersze" details="Koszyk i powiadomienia">
            <ListSkeleton variant="row" count={3} label="Ładowanie powiadomień…" />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Karty zamówień" details="Większe pozycje z miniaturą">
            <ListSkeleton variant="order" count={2} label="Ładowanie zamówień…" />
          </DesignSystemSpecimen>
        </div>
      </DesignSystemSection>

      <DesignSystemSection id="list-state-lab" title="Przejścia stanów" description="Przykład działania komponentu ListState">
        <div className="rounded-2xl border border-default p-4 sm:p-6">
          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Wybierz stan przykładowej listy">
            {modes.map(({ value, label }) => (
              <button className="ui-list-demo-switch" data-active={mode === value} key={value} type="button" aria-pressed={mode === value} onClick={() => selectMode(value)}>{label}</button>
            ))}
          </div>
          <ListState
            itemCount={["data", "refreshing", "refresh-error"].includes(mode) ? sampleProducts.length : 0}
            isLoading={mode === "loading" || mode === "refreshing"}
            hasError={mode === "error" || mode === "refresh-error"}
            hasActiveFilters={mode === "no-results"}
            onRetry={retry}
            loadingState={<ListSkeleton variant="product" count={4} label="Ładowanie produktów…" />}
            emptyState={<ListFeedback kind="empty" icon={<StateIcon name="bag" />} title="Lista jest pusta" description="Produkty pojawią się tutaj po ich dodaniu." />}
            noResultsState={<ListFeedback kind="no-results" icon={<StateIcon name="search" />} title="Brak wyników" description="Zmień hasło lub wybrane filtry." />}
            errorState={<ListFeedback kind="error" icon={<StateIcon name="error" />} title="Nie udało się pobrać produktów" description="Sprawdź połączenie i spróbuj ponownie." action={{ label: "Spróbuj ponownie", onClick: retry }} />}
          >
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Przykładowe produkty">
              {sampleProducts.map((product, index) => (
                <li className="min-w-0 rounded-xl border border-default p-3" key={product}>
                  <div className="mb-3 grid aspect-square place-items-center rounded-lg bg-muted text-3xl text-muted" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                  <p className="break-words text-sm font-medium text-strong">{product}</p>
                </li>
              ))}
            </ul>
          </ListState>
          <p className="mt-4 text-xs text-muted" role="status">Wywołania funkcji ponowienia: {retryCount}</p>
        </div>
      </DesignSystemSection>
    </>
  );
}

function StateIcon({ name }: { name: "bag" | "heart" | "receipt" | "bell" | "search" | "error" }) {
  const paths = {
    bag: <><path d="M4 8h16l-1 13H5L4 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    heart: <path d="M20.8 8.7c0 4.2-8.8 10.4-8.8 10.4S3.2 12.9 3.2 8.7a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z" />,
    receipt: <><path d="M5 3h14v18l-3.5-2-3.5 2-3.5-2L5 21V3Z" /><path d="M9 8h6M9 12h6" /></>,
    bell: <><path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3Z" /><path d="M10 20h4" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    error: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 17h.01" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
