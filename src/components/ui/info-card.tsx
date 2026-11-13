import Link from "next/link";
import type { ComponentProps, MouseEventHandler, ReactNode } from "react";

export type InfoCardProps = {
  children: ReactNode;
  divided?: boolean;
  className?: string;
};

export function InfoCard({
  children,
  divided = true,
  className = "",
}: InfoCardProps) {
  return (
    <div className={`ui-info-card ${className}`} data-divided={divided}>
      {children}
    </div>
  );
}

type InfoRowContent = {
  title: string;
  description?: string;
  trailing?: ReactNode;
  showChevron?: boolean;
  className?: string;
  "aria-label"?: string;
};

type InfoRowLeading =
  | { icon?: ReactNode; image?: never }
  | { image: ReactNode; icon?: never };

export type InfoRowProps = InfoRowContent & InfoRowLeading &
  (
    | { kind?: "static"; href?: never; onClick?: never; disabled?: never }
    | {
        kind: "link";
        href: ComponentProps<typeof Link>["href"];
        onClick?: never;
        disabled?: never;
      }
    | {
        kind: "button";
        onClick: MouseEventHandler<HTMLButtonElement>;
        disabled?: boolean;
        href?: never;
      }
  );

export function InfoRow(props: InfoRowProps) {
  const { title, description, icon, image, trailing, className = "" } = props;
  const showChevron = props.showChevron ?? props.kind === "link";
  const content = (
    <>
      {icon && <span className="ui-info-row-icon" aria-hidden="true">{icon}</span>}
      {image && <span className="ui-info-row-image">{image}</span>}
      <span className="ui-info-row-main">
        <span className="ui-info-row-copy">
          <span className="ui-info-row-title">{title}</span>
          {description && <span className="ui-info-row-description">{description}</span>}
        </span>
        {trailing != null && <span className="ui-info-row-trailing">{trailing}</span>}
      </span>
      {showChevron && (props.kind === "link" || props.kind === "button") && (
        <svg
          className="ui-info-row-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 5 7 7-7 7" />
        </svg>
      )}
    </>
  );
  const rowClassName = `ui-info-row ${className}`;

  if (props.kind === "link") {
    return (
      <Link className={rowClassName} href={props.href} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }

  if (props.kind === "button") {
    return (
      <button
        className={rowClassName}
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props["aria-label"]}
      >
        {content}
      </button>
    );
  }

  return <div className={rowClassName}>{content}</div>;
}
