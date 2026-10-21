"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

type ButtonProps = React.ComponentProps<"button"> & {
  label?: string;
  block?: boolean;
  loading?: boolean;
  timeout?: number;
  icon?: string;
  trailingIcon?: string;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
  variant?: "solid" | "outline" | "soft" | "subtle" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  square?: boolean;
};

const styles = {
  base: "rounded-md font-medium inline-flex items-center cursor-pointer transition-colors focus-visible:outline-3 disabled:cursor-not-allowed aria-disabled:cursor-not-allowed",
  icon: {
    base: "shrink-0",
  },
  block: {
    true: "w-full justify-center",
    false: "",
  },
  loading: {
    true: "animate-spin",
    false: "",
  },
  timeout: {
    base: "tabular-nums",
  },
  variant: {
    solid: "text-inverted",
    outline: "bg-transparent ring ring-inset",
    soft: "",
    subtle: "ring ring-inset",
    ghost: "",
  },
  color: {
    primary: {
      base: "outline-primary/25",
      solid: "bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary/75 aria-disabled:bg-primary/75",
      outline: "text-primary ring-primary/50 focus-visible:ring-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-primary/10 aria-disabled:bg-primary/10",
      soft: "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/15 aria-disabled:bg-primary/15",
      subtle: "text-primary ring-primary/25 focus-visible:ring-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/15 aria-disabled:bg-primary/15",
      ghost: "text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-primary/10 aria-disabled:bg-primary/10",
    },
    secondary: {
      base: "outline-secondary/25",
      solid: "bg-secondary hover:bg-secondary/75 active:bg-secondary/75 disabled:bg-secondary/75 aria-disabled:bg-secondary/75",
      outline: "text-secondary ring-secondary/50 focus-visible:ring-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-secondary/10 aria-disabled:bg-secondary/10",
      soft: "text-secondary bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 disabled:bg-secondary/15 aria-disabled:bg-secondary/15",
      subtle: "text-secondary ring-secondary/25 focus-visible:ring-secondary bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 disabled:bg-secondary/15 aria-disabled:bg-secondary/15",
      ghost: "text-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-secondary/10 aria-disabled:bg-secondary/10",
    },
    success: {
      base: "outline-success/25",
      solid: "bg-success hover:bg-success/75 active:bg-success/75 disabled:bg-success/75 aria-disabled:bg-success/75",
      outline: "text-success ring-success/50 focus-visible:ring-success hover:bg-success/10 active:bg-success/10 disabled:bg-success/10 aria-disabled:bg-success/10",
      soft: "text-success bg-success/10 hover:bg-success/15 active:bg-success/15 disabled:bg-success/15 aria-disabled:bg-success/15",
      subtle: "text-success ring-success/25 focus-visible:ring-success bg-success/10 hover:bg-success/15 active:bg-success/15 disabled:bg-success/15 aria-disabled:bg-success/15",
      ghost: "text-success hover:bg-success/10 active:bg-success/10 disabled:bg-success/10 aria-disabled:bg-success/10",
    },
    info: {
      base: "outline-info/25",
      solid: "bg-info hover:bg-info/75 active:bg-info/75 disabled:bg-info/75 aria-disabled:bg-info/75",
      outline: "text-info ring-info/50 focus-visible:ring-info hover:bg-info/10 active:bg-info/10 disabled:bg-info/10 aria-disabled:bg-info/10",
      soft: "text-info bg-info/10 hover:bg-info/15 active:bg-info/15 disabled:bg-info/15 aria-disabled:bg-info/15",
      subtle: "text-info ring-info/25 focus-visible:ring-info bg-info/10 hover:bg-info/15 active:bg-info/15 disabled:bg-info/15 aria-disabled:bg-info/15",
      ghost: "text-info hover:bg-info/10 active:bg-info/10 disabled:bg-info/10 aria-disabled:bg-info/10",
    },
    warning: {
      base: "outline-warning/25",
      solid: "bg-warning hover:bg-warning/75 active:bg-warning/75 disabled:bg-warning/75 aria-disabled:bg-warning/75",
      outline: "text-warning ring-warning/50 focus-visible:ring-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-warning/10 aria-disabled:bg-warning/10",
      soft: "text-warning bg-warning/10 hover:bg-warning/15 active:bg-warning/15 disabled:bg-warning/15 aria-disabled:bg-warning/15",
      subtle: "text-warning ring-warning/25 focus-visible:ring-warning bg-warning/10 hover:bg-warning/15 active:bg-warning/15 disabled:bg-warning/15 aria-disabled:bg-warning/15",
      ghost: "text-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-warning/10 aria-disabled:bg-warning/10",
    },
    error: {
      base: "outline-error/25",
      solid: "bg-error hover:bg-error/75 active:bg-error/75 disabled:bg-error/75 aria-disabled:bg-error/75",
      outline: "text-error ring-error/50 focus-visible:ring-error hover:bg-error/10 active:bg-error/10 disabled:bg-error/10 aria-disabled:bg-error/10",
      soft: "text-error bg-error/10 hover:bg-error/15 active:bg-error/15 disabled:bg-error/15 aria-disabled:bg-error/15",
      subtle: "text-error ring-error/25 focus-visible:ring-error bg-error/10 hover:bg-error/15 active:bg-error/15 disabled:bg-error/15 aria-disabled:bg-error/15",
      ghost: "text-error hover:bg-error/10 active:bg-error/10 disabled:bg-error/10 aria-disabled:bg-error/10",
    },
  },
  size: {
    xs: {
      base: "text-xs gap-1",
      square: {
        true: "p-1",
        false: "px-2 py-1",
      },
    },
    sm: {
      base: "text-xs gap-1.5",
      square: {
        true: "p-1.5",
        false: "px-2.5 py-1.5",
      },
    },
    md: {
      base: "text-sm gap-1.5",
      square: {
        true: "p-1.5",
        false: "px-2.5 py-1.5",
      },
    },
    lg: {
      base: "text-sm gap-2",
      square: {
        true: "p-2",
        false: "px-3 py-2",
      },
    },
    xl: {
      base: "text-base gap-2",
      square: {
        true: "p-2",
        false: "px-3 py-2",
      },
    },
  },
};

export default function Button({
  children,
  label,
  icon,
  trailingIcon,
  disabled = false,
  loading = false,
  timeout: initialTimeout = 0,
  color = "primary",
  variant = "solid",
  size = "md",
  square = !label && (children == null || typeof children === "boolean" || children === ""),
  block = false,
  type = "button",
  className,
  ...rest

}: ButtonProps) {
  
  const [timeout, setRemaining] = useState(initialTimeout);

  useEffect(() => {
    if (timeout <= 0) return;
    const timer = window.setTimeout(setRemaining, 1000, timeout - 1);
    return () => window.clearTimeout(timer);
  }, [timeout]);

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading || timeout > 0}
      aria-busy={loading || undefined}
      className={[
        styles.base,
        styles.variant[variant],
        styles.color[color].base,
        styles.color[color][variant],
        styles.size[size].base,
        styles.size[size].square[square ? "true" : "false"],
        styles.block[block ? "true" : "false"],
        className,
      ].join(" ")}
    >
      <Icon
        name={timeout > 0 ? "clock" : loading ? "loader-circle" : icon}
        size={size}
        className={[
          styles.icon.base,
          styles.loading[loading && timeout <= 0 ? "true" : "false"],
        ].join(" ")}
      />
      {timeout > 0 && <span className={styles.timeout.base}>{timeout}</span>}
      {children ?? label}
      <Icon
        name={trailingIcon}
        size={size}
        className={styles.icon.base}
      />
    </button>
  );
}
