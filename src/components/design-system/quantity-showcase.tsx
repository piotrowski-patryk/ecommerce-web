"use client";

import { useState } from "react";
import { DesignSystemSection } from "@/components/design-system/section";
import { DesignSystemSpecimen } from "@/components/design-system/specimen";
import { QuantityCounter } from "@/components/ui/quantity-counter";
import Button from "@/components/ui/button";

export function QuantityShowcase() {
  const [minimumValue, setMinimumValue] = useState(1);
  const [regularValue, setRegularValue] = useState(2);
  const [limitedValue, setLimitedValue] = useState(3);
  const [maximum, setMaximum] = useState(3);

  return (
    <DesignSystemSection
      id="quantity-counter-heading"
      title="Licznik ilości"
      description="Wspólna kontrolka dla produktu i koszyka"
    >
      <div className="overflow-hidden rounded-2xl border border-default">
        <DesignSystemSpecimen name="Minimum" details="Ilość 1 · minus nieaktywny">
          <QuantityCounter value={minimumValue} onValueChange={setMinimumValue} />
        </DesignSystemSpecimen>
        <DesignSystemSpecimen name="Większa ilość" details="Oba przyciski aktywne">
          <QuantityCounter value={regularValue} onValueChange={setRegularValue} />
        </DesignSystemSpecimen>
        <DesignSystemSpecimen name="Maksimum" details={`Limit ${maximum} · plus nieaktywny przy limicie`}>
          <div className="flex flex-wrap items-center gap-4">
            <QuantityCounter value={limitedValue} max={maximum} onValueChange={setLimitedValue} />
            <Button
              variant="outline"
              onClick={() => {
                const nextMaximum = maximum === 3 ? 5 : 3;
                setMaximum(nextMaximum);
                setLimitedValue((current) => Math.min(current, nextMaximum));
              }}
            >
              Zmień limit na {maximum === 3 ? 5 : 3}
            </Button>
          </div>
        </DesignSystemSpecimen>
        <DesignSystemSpecimen name="Zapisywanie" details="Spinner na liczbie i zablokowane przyciski">
          <QuantityCounter value={2} onValueChange={() => {}} pending />
        </DesignSystemSpecimen>
        <DesignSystemSpecimen name="Nieaktywny" details="disabled blokuje oba przyciski">
          <QuantityCounter value={2} onValueChange={() => {}} disabled />
        </DesignSystemSpecimen>
      </div>
    </DesignSystemSection>
  );
}
