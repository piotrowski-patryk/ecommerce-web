import { cva } from "class-variance-authority";
import Icon from "@/components/ui/icon";

type ButtonIcons = string | {
  start?: string;
  end?: string;
};

type ButtonProps = React.ComponentProps<"button"> & {
  label?: string;
  icon?: ButtonIcons;

  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
  variant?: "solid" | "outline" | "soft" | "subtle" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  square?: boolean;
  block?: boolean;
};

export const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
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
        solid: "text-inverted!",
        outline: "border border-current/50 outline-current/25 enabled:hover:bg-current/10 focus-visible:border-current",
        soft: "bg-current/10 outline-current/25 enabled:hover:bg-current/20",
        subtle: "border border-current/25 bg-current/10 outline-current/25 enabled:hover:bg-current/20 focus-visible:border-current",
        ghost: "outline-current/25 enabled:hover:bg-current/10",
      },

      size: {
        xs: "text-xs gap-1 p-1",
        sm: "text-xs gap-1.5 p-1.5",
        md: "text-sm gap-1.5 p-1.5",
        lg: "text-sm gap-2 p-2",
        xl: "text-base gap-2 p-2",
      },

      square: {
        true: "shrink-0",
        false: "px-[0.8em]",
      },

      block: {
        true: "w-full",
      },
    },

    compoundVariants: [
      {
        variant: "solid",
        color: "primary",
        className: "bg-primary outline-primary/25 enabled:hover:bg-primary/90",
      },
      {
        variant: "solid",
        color: "secondary",
        className: "bg-secondary outline-secondary/25 enabled:hover:bg-secondary/90",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-success outline-success/25 enabled:hover:bg-success/90",
      },
      {
        variant: "solid",
        color: "info",
        className: "bg-info outline-info/25 enabled:hover:bg-info/90",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-warning outline-warning/25 enabled:hover:bg-warning/90",
      },
      {
        variant: "solid",
        color: "error",
        className: "bg-error outline-error/25 enabled:hover:bg-error/90",
      },
    ],
  },
);

export default function Button({
  children,
  label,
  icon,

  color = "primary",
  variant = "solid",
  size = "md",
  square = !label && (children == null || children === "" || typeof children === "boolean"),
  block,
  className,

  type = "button",
  ...rest

}: ButtonProps) {
  if (typeof icon === "string") icon = { start: icon };

  return (
    <button
      type={type}
      className={buttonStyles({ color, variant, size, square, block, className })}
      {...rest}
    >
      <Icon
        name={icon?.start}
        size={size}
      />

      {children ?? label}

      <Icon
        name={icon?.end}
        size={size}
      />
    </button>
  );
}
