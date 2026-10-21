import clock from "@/assets/icons/clock.svg?raw";
import loaderCircle from "@/assets/icons/loader-circle.svg?raw";
import menu from "@/assets/icons/menu.svg?raw";
import shoppingBag from "@/assets/icons/shopping-bag.svg?raw";

type IconProps = React.ComponentProps<"span"> & {
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const styles = {
  base: "inline-flex fill-none stroke-current stroke-2 [&>svg]:size-full",
  size: {
    xs: "size-4",
    sm: "size-4",
    md: "size-5",
    lg: "size-5",
    xl: "size-6",
  },
};

const icons: Record<string, string> = {
  clock,
  "loader-circle": loaderCircle,
  menu,
  "shopping-bag": shoppingBag,
};

export default function Icon({ name, size = "xl", className, ...rest }: IconProps) {
  if (!name) return null;

  const svg = Object.hasOwn(icons, name) ? icons[name] : undefined;

  if (!svg) return null;

  return (
    <span
      {...rest}
      aria-hidden="true"
      className={[styles.base, styles.size[size], className].join(" ")}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
