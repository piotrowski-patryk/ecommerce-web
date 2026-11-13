"use client";

import { useState } from "react";
import { DesignSystemSection } from "@/components/design-system/section";
import { DesignSystemSpecimen } from "@/components/design-system/specimen";
import Button from "@/components/ui/button";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;
const variants = ["solid", "outline", "soft", "subtle", "ghost"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const colorLabels = {
  primary: "Primary",
  secondary: "Secondary",
  success: "Success",
  info: "Info",
  warning: "Warning",
  error: "Error",
} as const;

export function ButtonShowcase() {
  const [count, setCount] = useState(0);
  const [timeoutKey, setTimeoutKey] = useState(0);

  return (
    <>
      <div className="border-t border-default pt-14">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Design system / 02
        </p>
        <h2 className="text-4xl font-semibold text-strong sm:text-5xl">Przyciski systemowe</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Warianty wspólnego przycisku dla działań w sklepie. Sprawdź rozmiary,
          ikony i stany, a następnie użyj tego samego komponentu na ekranach aplikacji.
        </p>
      </div>
      <DesignSystemSection
        id="buttons-heading"
        title="Warianty i stany"
        description="Button · kolory, warianty i stany"
      >
        <div className="overflow-hidden rounded-2xl border border-default">
          <DesignSystemSpecimen name="Kolory i warianty" details="6 kolorów · 5 wariantów">
            <div className="overflow-x-auto pb-2">
              <div className="grid min-w-[38rem] grid-cols-5 gap-x-3 gap-y-4">
                {variants.map((variant) => (
                  <span key={variant} className="text-xs font-medium text-muted">
                    {variant}
                  </span>
                ))}
                {colors.flatMap((color) =>
                  variants.map((variant) => (
                    <Button key={`${color}-${variant}`} color={color} variant={variant}>
                      {colorLabels[color]}
                    </Button>
                  )),
                )}
              </div>
            </div>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Rozmiary" details="xs · sm · md · lg · xl">
            <div className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size}>
                  {size.toUpperCase()}
                </Button>
              ))}
            </div>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Treść i ikony" details="Ikona z lewej, z prawej i bez etykiety">
            <div className="flex flex-wrap items-center gap-3">
              <Button icon="shopping-bag">Dodaj do koszyka</Button>
              <Button variant="outline" trailingIcon="menu">Więcej opcji</Button>
              <Button variant="soft" icon="menu" aria-label="Otwórz menu" />
            </div>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Pełna szerokość" details="block w kontenerze">
            <div className="max-w-sm">
              <Button block icon="shopping-bag">Przejdź do koszyka</Button>
            </div>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Stany" details="disabled · loading · odliczanie">
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Nieaktywny</Button>
              <Button loading>Zapisywanie</Button>
              <Button key={timeoutKey} timeout={10}>Poczekaj</Button>
              <Button variant="outline" onClick={() => setTimeoutKey((key) => key + 1)}>
                Uruchom odliczanie ponownie
              </Button>
            </div>
          </DesignSystemSpecimen>

          <DesignSystemSpecimen name="Działanie" details="Przykład onClick · domyślny typ button">
            <Button variant="soft" onClick={() => setCount((current) => current + 1)}>
              Kliknięcia: {count}
            </Button>
          </DesignSystemSpecimen>
        </div>
      </DesignSystemSection>
    </>
  );
}
