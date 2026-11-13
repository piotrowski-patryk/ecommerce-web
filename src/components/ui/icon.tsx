import { cva } from "class-variance-authority";

type IconProps = React.ComponentProps<"span"> & {
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const iconStyles = cva(
  "inline-flex shrink-0 fill-none stroke-current stroke-2 [&>svg]:size-full",
  {
    variants: {
      size: {
        xs: "size-4",
        sm: "size-4",
        md: "size-5",
        lg: "size-5",
        xl: "size-6",
      },
    },
  },
);

const icons = import.meta.glob<string>("*.svg", {
  base: "../../assets/icons",
  eager: true,
  import: "default",
  query: "?raw",
});

export default function Icon({
  name,
  size = "md",
  className,

  ...rest

}: IconProps) {
  const svg = name ? icons[`./${name}.svg`] : undefined;

  if (!svg) return null;

  return (
    <span
      {...rest}
      aria-hidden="true"
      className={iconStyles({ size, className })}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
