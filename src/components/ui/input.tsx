"use client";

import { useId, useState, type ComponentPropsWithRef, type ReactNode } from "react";

type BaseInputProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
  label: string;
  hint?: string;
  error?: string;
  leadingIcon?: ReactNode;
};

export type InputProps = BaseInputProps &
  (
    | { type: "password"; trailingIcon?: never }
    | { type?: "text" | "email" | "search"; trailingIcon?: ReactNode }
  );

export function Input({
  type = "text",
  label,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  id,
  className,
  required,
  disabled,
  readOnly,
  ...inputProps
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [inputProps["aria-describedby"], hintId, errorId]
    .filter(Boolean)
    .join(" ") || undefined;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`ui-field ${className ?? ""}`}>
      <label className="ui-field-label" htmlFor={inputId}>
        {label}
        {required && <span className="ui-field-required" aria-hidden="true"> *</span>}
      </label>
      <div className="ui-input-shell" data-invalid={Boolean(error)} data-disabled={Boolean(disabled)}>
        {leadingIcon && <span className="ui-input-icon" aria-hidden="true">{leadingIcon}</span>}
        <input
          {...inputProps}
          id={inputId}
          type={isPassword && passwordVisible ? "text" : type}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error ? true : inputProps["aria-invalid"]}
          aria-describedby={describedBy}
          className="ui-input-control"
        />
        {isPassword ? (
          <button
            type="button"
            className="ui-input-action"
            onClick={() => setPasswordVisible((visible) => !visible)}
            aria-label={passwordVisible ? "Ukryj hasło" : "Pokaż hasło"}
            aria-pressed={passwordVisible}
            aria-controls={inputId}
            disabled={disabled}
          >
            {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        ) : trailingIcon ? (
          <span className="ui-input-icon" aria-hidden="true">{trailingIcon}</span>
        ) : null}
      </div>
      {hint && <p id={hintId} className="ui-field-hint">{hint}</p>}
      {error && <p id={errorId} className="ui-field-error">{error}</p>}
    </div>
  );
}

function EyeOpenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 3 21 21M10.6 6.1A10.4 10.4 0 0 1 12 6c6 0 9.5 6 9.5 6a14 14 0 0 1-3.2 3.7M6.2 7.7A14.3 14.3 0 0 0 2.5 12s3.5 6 9.5 6c1 0 2-.2 2.8-.4" />
      <path d="M10 10a2.8 2.8 0 0 0 4 4" />
    </svg>
  );
}
