import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: [
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
    "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary/50",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ],
  variants: {
    variant: {
      solid: "bg-primary text-inverted hover:bg-primary/85",
      outline: "border border-default bg-default text-strong hover:bg-muted",
      soft: "bg-primary/10 text-primary hover:bg-primary/15",
      subtle: "border border-primary/25 bg-primary/10 text-primary hover:bg-primary/15",
      ghost: "text-primary hover:bg-primary/10",
      link: "text-primary underline-offset-4 hover:underline",
      destructive: "bg-error text-white hover:bg-error/85",
    },
    size: {
      xs: "gap-1 px-2 py-1 text-xs",
      sm: "gap-1.5 px-2.5 py-1.5 text-xs",
      md: "gap-1.5 px-3 py-2 text-sm",
      lg: "gap-2 px-4 py-2.5 text-sm",
      xl: "gap-2 px-5 py-3 text-base",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof styles>;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button {...props} type={type} className={styles({ variant, size, className })} />;
}
