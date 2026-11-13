import { cva } from "class-variance-authority";
import Icon from "@/components/ui/icon";

type InputIcons = string | {
  start?: string;
  end?: string;
};

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  type?: "text" | "email" | "search" | "password";
  icon?: InputIcons;

  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
  variant?: "outline" | "soft" | "subtle" | "ghost" | "none";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  block?: boolean;
};

export const inputStyles = cva(
  "inline-flex min-w-0 items-center rounded-md px-3 outline-3 outline-offset-0 outline-current/25 outline-none transition-colors has-disabled:cursor-not-allowed has-disabled:opacity-75 has-aria-invalid:border has-aria-invalid:border-current has-aria-invalid:text-error",
  {
    variants: {
      color: {
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        info: "text-info",
        warning: "text-warning",
        error: "text-error",
      },

      variant: {
        outline: "border border-default bg-default has-focus-visible:border-current has-focus-visible:outline-solid",
        soft: "bg-muted has-focus-visible:outline-solid",
        subtle: "border border-default bg-muted has-focus-visible:border-current has-focus-visible:outline-solid",
        ghost: "bg-transparent focus-within:bg-muted has-read-write:hover:bg-muted has-focus-visible:outline-solid",
        none: "bg-transparent",
      },

      size: {
        xs: "gap-1 py-1 text-xs",
        sm: "gap-1.5 py-1.5 text-xs",
        md: "gap-1.5 py-1.5 text-sm",
        lg: "gap-2 py-2 text-sm",
        xl: "gap-2 py-2 text-base",
      },

      block: {
        true: "w-full",
      },
    },
  },
);

export default function Input({
  icon,

  color = "primary",
  variant = "outline",
  size = "md",
  block,
  className,

  type = "text",
  ...rest

}: InputProps) {
  if (typeof icon === "string") icon = { start: icon };

  return (
    <div className={inputStyles({ color, variant, size, block, className })}>
      <Icon
        name={icon?.start}
        size={size}
      />

      <input
        type={type}
        className="min-w-0 flex-1 text-default outline-none placeholder:text-muted"
        {...rest}
      />

      <Icon
        name={icon?.end}
        size={size}
      />
    </div>
  );
}
