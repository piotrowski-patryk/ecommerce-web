type DesignSystemPageHeaderProps = {
  index: string;
  title: string;
  description: string;
};

export function DesignSystemPageHeader({
  index,
  title,
  description,
}: DesignSystemPageHeaderProps) {
  return (
    <header className="max-w-2xl">
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Design system / {index}
      </p>
      <h1 className="text-4xl leading-tight font-semibold text-strong sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        {description}
      </p>
    </header>
  );
}
