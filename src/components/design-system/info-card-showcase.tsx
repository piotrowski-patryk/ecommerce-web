"use client";

import { useState } from "react";
import { DesignSystemSection } from "@/components/design-system/section";
import { DesignSystemSpecimen } from "@/components/design-system/specimen";
import { InfoCard, InfoRow } from "@/components/ui/info-card";

export function InfoCardShowcase() {
  const [addressSaved, setAddressSaved] = useState(false);

  return (
    <>
      <div className="border-t border-default pt-14">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Design system / 05
        </p>
        <h2 className="text-4xl font-semibold text-strong sm:text-5xl">Karty informacyjne</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Jeden układ dla danych zamówienia, adresu i nawigacji. Sprawdź linki oraz
          akcję klawiaturą lub klikając cały wiersz.
        </p>
      </div>

      <DesignSystemSection id="info-cards-heading" title="Wiersze w karcie">
        <div className="overflow-hidden rounded-2xl border border-default">
          <DesignSystemSpecimen name="Menu profilu" details="Trzy linki · cały wiersz aktywny">
            <InfoCard>
              <InfoRow
                kind="link"
                href="/design-system#order-summary-heading"
                icon={<ReceiptIcon />}
                title="Moje zamówienia"
              />
              <InfoRow
                kind="link"
                href="/design-system#delivery-details-heading"
                icon={<PinIcon />}
                title="Adresy dostawy"
              />
              <InfoRow
                kind="link"
                href="/design-system#payment-details-heading"
                icon={<CardIcon />}
                title="Metody płatności"
              />
            </InfoCard>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Adres dostawy" details="Długi adres i akcja przyciskowa">
            <div id="delivery-details-heading" className="max-w-md scroll-mt-24">
              <InfoCard>
                <InfoRow
                  icon={<TruckIcon />}
                  title="Dostawa standardowa"
                  trailing="3–5 dni roboczych"
                />
                <InfoRow
                  icon={<PinIcon />}
                  title="Aleja Niepodległości 123B/45, 02-626 Warszawa, Polska"
                  description="Anna Kowalska · +48 501 234 567"
                />
                <InfoRow
                  kind="button"
                  icon={<ReceiptIcon />}
                  title="Zapisz adres dostawy"
                  aria-label="Zapisz adres dostawy"
                  trailing={addressSaved ? "Zapisano" : "Zapisz"}
                  onClick={() => setAddressSaved(true)}
                  disabled={addressSaved}
                />
              </InfoCard>
              <p className="mt-3 min-h-5 text-sm text-muted" role="status">
                {addressSaved ? "Adres dostawy został zapisany." : ""}
              </p>
            </div>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Metoda płatności" details="Statyczna informacja o wybranej metodzie">
            <div id="payment-details-heading" className="max-w-md scroll-mt-24">
              <InfoCard divided={false}>
                <InfoRow
                  icon={<CardIcon />}
                  title="Visa •••• 4242"
                  description="Karta użyta przy zamówieniu"
                  trailing="Opłacono"
                />
              </InfoCard>
            </div>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Podsumowanie zamówienia" details="Statyczne wiersze · wartość po prawej">
            <div id="order-summary-heading" className="max-w-md scroll-mt-24">
              <InfoCard>
                <InfoRow icon={<ReceiptIcon />} title="Numer zamówienia" trailing="NEO-2094" />
                <InfoRow icon={<CardIcon />} title="Zapłacono przez" trailing="Visa •••• 4242" />
                <InfoRow icon={<TruckIcon />} title="Dostawa" trailing="śr., 2 wrz" />
                <InfoRow icon={<BagIcon />} title="Suma" trailing="1489,32 zł" />
              </InfoCard>
            </div>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Wąski ekran" details="Miniatura, długi tytuł i wartość zawijają się">
            <div className="max-w-64">
              <InfoCard divided={false}>
                <InfoRow
                  image={<ProductThumbnail />}
                  title="Koszulka z bardzo długą nazwą kolekcji jesiennej"
                  description="Granatowy · Rozmiar M · 2 sztuki"
                  trailing="259,00 zł"
                />
              </InfoCard>
            </div>
          </DesignSystemSpecimen>
        </div>
      </DesignSystemSection>
    </>
  );
}

function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function ReceiptIcon() {
  return <Glyph><path d="M5 3h14v18l-3.5-2-3.5 2-3.5-2L5 21V3Z" /><path d="M9 8h6M9 12h6" /></Glyph>;
}

function PinIcon() {
  return <Glyph><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.25" /></Glyph>;
}

function CardIcon() {
  return <Glyph><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 10h19M6 15h4" /></Glyph>;
}

function TruckIcon() {
  return <Glyph><path d="M2 5h12v11H2M14 9h4l3 3v4h-7M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></Glyph>;
}

function BagIcon() {
  return <Glyph><path d="M4 8h16l-1 13H5L4 8ZM9 9V6a3 3 0 0 1 6 0v3" /></Glyph>;
}

function ProductThumbnail() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Granatowa koszulka" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" fill="#e8edf2" />
      <path d="m23 15-11 6-5 15 11 4 4-8v23h20V32l4 8 11-4-5-15-11-6-5 5h-8l-5-5Z" fill="#203b59" />
      <path d="m28 20 4 5 4-5" fill="none" stroke="#a4b8cd" strokeWidth="2" />
    </svg>
  );
}
