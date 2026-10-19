import type { ReactNode } from "react";

type DesignSystemSectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function DesignSystemSection({
  id,
  title,
  description,
  children,
}: DesignSystemSectionProps) {
  return (
    <section aria-labelledby={id}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h2 id={id} className="text-2xl font-semibold text-strong">
          {title}
        </h2>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}
