"use client";

import { useLayoutEffect, useRef } from "react";

export type QuantityCounterProps = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  pending?: boolean;
  label?: string;
  className?: string;
};

export function QuantityCounter({
  value,
  onValueChange,
  min = 1,
  max,
  disabled = false,
  pending = false,
  label = "Ilość produktu",
  className,
}: QuantityCounterProps) {
  const proposedValue = useRef(value);

  // An external update is authoritative, including a rejected cart request.
  useLayoutEffect(() => {
    proposedValue.current = value;
  }, [value, min, max, disabled, pending]);

  const blocked = disabled || pending;
  const outsideRange = value < min || (max !== undefined && value > max);
  const canDecrease = !blocked && !outsideRange && value > min;
  const canIncrease = !blocked && !outsideRange && (max === undefined || value < max);

  function changeBy(step: -1 | 1) {
    if (blocked || outsideRange) return;

    const next = proposedValue.current + step;
    if (next < min || (max !== undefined && next > max)) return;

    proposedValue.current = next;
    onValueChange(next);
  }

  return (
    <div
      className={`ui-quantity-counter ${className ?? ""}`}
      role="group"
      aria-label={label}
      aria-busy={pending || undefined}
      data-pending={pending || undefined}
      data-disabled={disabled || undefined}
    >
      <button
        className="ui-quantity-counter-button"
        type="button"
        aria-label={`Zmniejsz: ${label}`}
        disabled={!canDecrease}
        onClick={() => changeBy(-1)}
      >
        <span className="ui-quantity-counter-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <output className="ui-quantity-counter-value" aria-live="polite" aria-atomic="true">
        <span className="ui-quantity-counter-number">{value}</span>
        {pending && (
          <>
            <span className="ui-quantity-counter-spinner" aria-hidden="true" />
            <span className="sr-only">Trwa zapisywanie ilości</span>
          </>
        )}
      </output>
      <button
        className="ui-quantity-counter-button"
        type="button"
        aria-label={`Zwiększ: ${label}`}
        disabled={!canIncrease}
        onClick={() => changeBy(1)}
      >
        <span className="ui-quantity-counter-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}
