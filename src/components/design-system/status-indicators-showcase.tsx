import { DesignSystemSection } from "@/components/design-system/section";
import { DesignSystemSpecimen } from "@/components/design-system/specimen";
import {
  CountBadge,
  StatusBadge,
  StatusDot,
} from "@/components/ui/status-indicators";

export function StatusIndicatorsShowcase() {
  return (
    <DesignSystemSection
      id="status-indicators-heading"
      title="Znaczniki i liczniki"
      description="Krótka informacja w zamówieniach, nawigacji i powiadomieniach"
    >
      <div className="overflow-hidden rounded-2xl border border-default">
        <DesignSystemSpecimen name="Status zamówienia" details="Tekst pozostaje czytelny bez koloru">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge label="Wysłano" variant="info" withDot />
            <StatusBadge label="Dostarczono" variant="success" withDot />
            <StatusBadge label="W realizacji" variant="neutral" />
          </div>
        </DesignSystemSpecimen>
        <DesignSystemSpecimen name="Krótka etykieta" details="Neutralny znacznik bez kropki">
          <StatusBadge label="DOM" />
        </DesignSystemSpecimen>
        <DesignSystemSpecimen name="Obok tytułu" details="Układ zawija się na wąskim ekranie">
          <div className="flex max-w-72 flex-wrap items-start gap-2 rounded-xl border border-default p-3">
            <h3 className="min-w-0 flex-1 text-base font-medium text-strong">
              Zamówienie NEO-2094
            </h3>
            <StatusBadge label="Dostarczono" variant="success" withDot />
          </div>
        </DesignSystemSpecimen>
        <DesignSystemSpecimen name="Licznik kolekcji" details="0 ukryte · zwykła wartość · przekroczenie limitu">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span>0 ukryte</span>
              <CountBadge value={0} label="Zapisane produkty" />
            </div>
            <div className="flex items-center gap-2">
              <span>0 widoczne</span>
              <CountBadge value={0} label="Zapisane produkty" showZero />
            </div>
            <div className="flex items-center gap-2">
              <span>Kolekcje</span>
              <CountBadge value={3} label="Zapisane produkty" />
            </div>
            <div className="flex items-center gap-2">
              <span>Ponad limit</span>
              <CountBadge value={125} max={99} label="Zapisane produkty" />
            </div>
          </div>
        </DesignSystemSpecimen>
        <DesignSystemSpecimen name="Nowe powiadomienie" details="Samotna kropka ma opis dla czytnika">
          <div className="flex items-center gap-2">
            <span>Zamówienie wysłane</span>
            <StatusDot label="Nieprzeczytane powiadomienie" />
          </div>
        </DesignSystemSpecimen>
      </div>
    </DesignSystemSection>
  );
}
