"use client";

import { useId, type ReactNode } from "react";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  color?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  legend: string;
  name: string;
  options: RadioOption[];
  variant?: "card" | "size" | "color";
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function RadioGroup({
  legend,
  name,
  options,
  variant = "card",
  hint,
  error,
  required,
  disabled,
  defaultValue,
  value,
  onValueChange,
  className,
}: RadioGroupProps) {
  const groupId = useId();
  const hintId = hint ? `${groupId}-hint` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      className={`ui-radio-group ${className ?? ""}`}
      disabled={disabled}
      data-invalid={Boolean(error)}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
    >
      <legend className="ui-field-label">
        {legend}
        {required && <span className="ui-field-required" aria-hidden="true"> *</span>}
      </legend>
      <div className={`ui-radio-options ui-radio-options--${variant}`}>
        {options.map((option, index) => {
          const optionId = `${groupId}-${index}`;
          const descriptionId = option.description ? `${optionId}-description` : undefined;
          const optionDescribedBy = [descriptionId, describedBy].filter(Boolean).join(" ") || undefined;
          return (
            <div className="ui-radio-option" key={option.value}>
              <input
                id={optionId}
                className="ui-radio-input"
                type="radio"
                name={name}
                value={option.value}
                checked={value === undefined ? undefined : value === option.value}
                defaultChecked={value === undefined ? defaultValue === option.value : undefined}
                onChange={() => onValueChange?.(option.value)}
                readOnly={value !== undefined && !onValueChange}
                required={required}
                disabled={option.disabled}
                aria-label={option.label}
                aria-describedby={optionDescribedBy}
              />
              <label className={`ui-radio-label ui-radio-label--${variant}`} htmlFor={optionId}>
                {variant === "color" ? (
                  <>
                    <span className="ui-radio-swatch" style={{ backgroundColor: option.color }}>
                      <CheckIcon />
                    </span>
                    <span className="sr-only">{option.label}</span>
                  </>
                ) : variant === "size" ? (
                  option.label
                ) : (
                  <>
                    {option.icon && <span className="ui-radio-card-icon" aria-hidden="true">{option.icon}</span>}
                    <span className="ui-radio-card-copy">
                      <span className="ui-radio-card-title">{option.label}</span>
                      {option.description && <span id={descriptionId} className="ui-radio-card-description">{option.description}</span>}
                    </span>
                    <span className="ui-radio-indicator" aria-hidden="true"><CheckIcon /></span>
                  </>
                )}
              </label>
            </div>
          );
        })}
      </div>
      {hint && <p id={hintId} className="ui-field-hint">{hint}</p>}
      {error && <p id={errorId} className="ui-field-error">{error}</p>}
    </fieldset>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}
