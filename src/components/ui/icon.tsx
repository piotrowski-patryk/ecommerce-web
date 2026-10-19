import type { ComponentType, SVGProps } from "react";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const icons = import.meta.glob<SvgIcon>(
  "/src/assets/icons/*.svg",
  { eager: true, import: "default" },
);

type IconProps = {
  name: string;
  className?: string;
};

export function Icon({ name, className = "" }: IconProps) {
  const Svg = icons[`/src/assets/icons/${name}.svg`];

  if (!Svg) return null;

  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    />
  );
}