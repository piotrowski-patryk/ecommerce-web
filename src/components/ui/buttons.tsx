import { tv } from "tailwind-variants";

const styles = tv({
  base: [
    "rounded-md font-medium inline-flex items-center transition-colors",
    "disabled:cursor-not-allowed aria-disabled:cursor-not-allowed",
    "disabled:opacity-75 aria-disabled:opacity-75",
    "outline-primary/25 focus-visible:outline-3",
  ],
  variants: {
    variant: {
      solid:
        "text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary",
      outline:
        "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-primary",
      soft:
        "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10",
      subtle:
        "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus-visible:ring-primary",
      ghost:
        "text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent",
      link:
        "text-primary hover:text-primary/75 active:text-primary/75 disabled:text-primary aria-disabled:text-primary",
    },
    size: {
      xs: "px-2 py-1 text-xs gap-1",
      sm: "px-2.5 py-1.5 text-xs gap-1.5",
      md: "px-2.5 py-1.5 text-sm gap-1.5",
      lg: "px-3 py-2 text-sm gap-2",
      xl: "px-3 py-2 text-base gap-2",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

export const Button = () => <button className={styles()} />;