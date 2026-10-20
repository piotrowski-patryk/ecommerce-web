"use client";

import { useState } from "react";
import { DesignSystemSection } from "@/components/design-system/section";
import { DesignSystemSpecimen } from "@/components/design-system/specimen";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";

const deliveryOptions = [
  { value: "standard", label: "Standard Delivery", description: "3–5 business days", trailingText: "Free" },
  { value: "express", label: "Express Delivery", description: "1–2 business days", trailingText: "$14.90" },
  { value: "pickup", label: "Store Pickup", description: "NÉORA SoHo", trailingText: "Free" },
];

const paymentOptions = [
  { value: "card", label: "Visa •••• 4242", description: "Expires 08/29", icon: <PaymentCardIcon /> },
  { value: "apple", label: "Apple Pay", description: "Confirm with Face ID" },
  { value: "cash", label: "Cash on Delivery", description: "Pay the courier" },
];

const sizeOptions = ["XS", "S", "M", "L"].map((size) => ({ value: size, label: size }));

const colorOptions = [
  { value: "blue", label: "Niebieski", color: "#3169a9" },
  { value: "cream", label: "Kremowy", color: "#f5e9cf" },
  { value: "ochre", label: "Ochra", color: "#d6972c" },
  { value: "burgundy", label: "Bordowy", color: "#81314f" },
  { value: "forest", label: "Zielony", color: "#285c4c" },
];

export function FormShowcase() {
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("");
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("blue");
  const [requiredSize, setRequiredSize] = useState("");
  const [stockSize, setStockSize] = useState("M");
  const [mediumAvailable, setMediumAvailable] = useState(true);

  const stockOptions = sizeOptions.map((option) => ({
    ...option,
    disabled: option.value === "M" && !mediumAvailable,
  }));

  return (
    <>
      <div className="border-t border-default pt-14">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Design system / 02
        </p>
        <h2 className="text-4xl font-semibold text-strong sm:text-5xl">Pola formularza</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Pola i wybory potrzebne na ekranach logowania, wyszukiwania, produktu oraz zamówienia.
          Kliknij kontrolki, aby sprawdzić ich zachowanie.
        </p>
      </div>

      <DesignSystemSection id="text-inputs-heading" title="Pola tekstowe">
        <div className="overflow-hidden rounded-2xl border border-default">
          <DesignSystemSpecimen name="E-mail" details="Logowanie · ikona z lewej">
            <Input
              type="email"
              name="demo-email"
              label="Adres e-mail"
              placeholder="you@example.com"
              autoComplete="email"
              required
              leadingIcon={<MailIcon />}
            />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Hasło" details="Wbudowany przycisk pokaż / ukryj">
            <Input
              type="password"
              name="demo-password"
              label="Hasło"
              placeholder="Wpisz hasło"
              autoComplete="current-password"
              required
              leadingIcon={<LockIcon />}
            />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Wyszukiwanie" details="Pole typu search">
            <Input
              type="search"
              name="demo-search"
              label="Szukaj produktów"
              placeholder="Moda męska"
              leadingIcon={<SearchIcon />}
            />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Tekst" details="Kod promocyjny · bez ikony">
            <Input
              type="text"
              name="demo-promo"
              label="Kod promocyjny"
              placeholder="Dodaj kod"
              autoComplete="off"
            />
          </DesignSystemSpecimen>
          <DesignSystemSpecimen name="Ikona po prawej" details="Opcjonalny element dekoracyjny">
            <Input
              type="text"
              name="demo-reference"
              label="Numer referencyjny"
              placeholder="Wpisz numer"
              trailingIcon={<TicketIcon />}
            />
          </DesignSystemSpecimen>
        </div>
      </DesignSystemSection>

      <DesignSystemSection id="selection-heading" title="Wybór jednej opcji" description="Natywne grupy radio">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-default p-5 sm:p-7">
            <RadioGroup
              name="demo-delivery"
              legend="Sposób dostawy"
              options={deliveryOptions}
              value={delivery}
              onValueChange={setDelivery}
              required
            />
          </div>
          <div className="rounded-2xl border border-default p-5 sm:p-7">
            <RadioGroup
              name="demo-payment"
              legend="Sposób płatności"
              options={paymentOptions}
              value={payment}
              onValueChange={setPayment}
              hint="Przykład zaczyna się bez zaznaczonej opcji."
              required
            />
          </div>
          <div className="rounded-2xl border border-default p-5 sm:p-7">
            <RadioGroup
              name="demo-size"
              legend="Rozmiar"
              options={sizeOptions}
              variant="size"
              value={size}
              onValueChange={setSize}
              required
            />
          </div>
          <div className="rounded-2xl border border-default p-5 sm:p-7">
            <RadioGroup
              name="demo-color"
              legend="Kolor"
              options={colorOptions}
              variant="color"
              value={color}
              onValueChange={setColor}
              required
            />
          </div>
        </div>
      </DesignSystemSection>

      <DesignSystemSection id="field-states-heading" title="Stany i komunikaty">
        <div className="grid gap-6 rounded-2xl border border-default p-5 sm:grid-cols-2 sm:p-8">
          <Input
            type="email"
            name="demo-error"
            label="E-mail z błędem"
            defaultValue="niepoprawny-adres"
            error="Wpisz poprawny adres e-mail."
            required
          />
          <Input
            type="text"
            name="demo-hint"
            label="Pole z podpowiedzią"
            placeholder="Wpisz tekst"
            hint="Podpowiedź pozostaje powiązana z polem."
          />
          <Input
            type="text"
            name="demo-disabled"
            label="Pole nieaktywne"
            defaultValue="Niedostępne"
            disabled
          />
          <Input
            type="text"
            name="demo-readonly"
            label="Tylko do odczytu"
            defaultValue="NEO-2094"
            readOnly
          />
          <div className="sm:col-span-2">
            <RadioGroup
              name="demo-radio-error"
              legend="Wybierz rozmiar"
              options={sizeOptions}
              variant="size"
              value={requiredSize}
              onValueChange={setRequiredSize}
              error={requiredSize ? undefined : "Wybierz rozmiar przed dodaniem produktu do koszyka."}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <RadioGroup
              name="demo-stock-change"
              legend="Dostępność rozmiaru"
              options={stockOptions}
              variant="size"
              value={stockSize}
              onValueChange={setStockSize}
              error={!stockSize ? "Wybrany rozmiar jest niedostępny. Wybierz ponownie." : undefined}
              required
            />
            <button
              className="mt-4 rounded-lg border border-default px-3 py-2 text-sm text-default hover:bg-muted focus-visible:outline-3 focus-visible:outline-primary/25"
              type="button"
              onClick={() => {
                const nextAvailable = !mediumAvailable;
                setMediumAvailable(nextAvailable);
                if (!nextAvailable && stockSize === "M") setStockSize("");
              }}
            >
              {mediumAvailable ? "Oznacz M jako niedostępny" : "Przywróć dostępność M"}
            </button>
          </div>
          <div className="sm:col-span-2">
            <RadioGroup
              name="demo-radio-disabled"
              legend="Niedostępny wybór"
              options={sizeOptions}
              variant="size"
              defaultValue="M"
              disabled
            />
          </div>
        </div>
      </DesignSystemSection>
    </>
  );
}

function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="3" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>;
}

function TicketIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Z" /><path d="M12 6v12" strokeDasharray="2 2" /></svg>;
}

function PaymentCardIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>;
}
