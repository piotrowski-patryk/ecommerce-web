export type StatusVariant = "neutral" | "info" | "success" | "attention";

type SharedProps = {
  variant?: StatusVariant;
  className?: string;
};

export type StatusBadgeProps = SharedProps & {
  label: string;
  withDot?: boolean;
};

export function StatusBadge({
  label,
  variant = "neutral",
  withDot = false,
  className = "",
}: StatusBadgeProps) {
  return (
    <span className={`ui-status-badge ${className}`} data-variant={variant}>
      {withDot && <span className="ui-status-badge-dot" aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}

export type CountBadgeProps = SharedProps & {
  value: number;
  label: string;
  max?: number;
  showZero?: boolean;
};

export function CountBadge({
  value,
  label,
  max = 99,
  showZero = false,
  variant = "attention",
  className = "",
}: CountBadgeProps) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError("CountBadge value must be a non-negative safe integer.");
  }

  if (!Number.isSafeInteger(max) || max < 1) {
    throw new RangeError("CountBadge max must be a positive safe integer.");
  }

  if (value === 0 && !showZero) return null;

  return (
    <span
      className={`ui-count-badge ${className}`}
      data-variant={variant}
      role="img"
      aria-label={`${label}: ${value}`}
    >
      <span aria-hidden="true">{value > max ? `${max}+` : value}</span>
    </span>
  );
}

export type StatusDotProps = SharedProps & {
  label: string;
};

export function StatusDot({
  label,
  variant = "attention",
  className = "",
}: StatusDotProps) {
  return (
    <span
      className={`ui-status-dot ${className}`}
      data-variant={variant}
      role="img"
      aria-label={label}
    />
  );
}
