import type { ReactNode } from "react";

type DesignSystemSpecimenProps = {
  name: string;
  details?: string;
  children: ReactNode;
};

export function DesignSystemSpecimen({
  name,
  details,
  children,
}: DesignSystemSpecimenProps) {
  return (
    <div className="grid gap-5 border-b border-default px-5 py-7 last:border-b-0 sm:px-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
      <div>
        <p className="text-sm font-semibold text-strong">{name}</p>
        {details && <p className="mt-1 text-xs text-muted">{details}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
