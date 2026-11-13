"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export type ListFeedbackAction =
  | { label: string; onClick: () => void; href?: never }
  | { label: string; href: string; onClick?: never };

export type ListFeedbackProps = {
  kind: "empty" | "no-results" | "error";
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ListFeedbackAction;
  className?: string;
};

export function ListFeedback({
  kind,
  title,
  description,
  icon,
  action,
  className = "",
}: ListFeedbackProps) {
  return (
    <div className={`ui-list-feedback ${className}`} data-kind={kind} role={kind === "error" ? "alert" : "status"}>
      {icon && <div className="ui-list-feedback-icon" aria-hidden="true">{icon}</div>}
      <h3 className="ui-list-feedback-title">{title}</h3>
      {description && <p className="ui-list-feedback-description">{description}</p>}
      {action && (
        "href" in action && action.href ? (
          <Link className="ui-list-feedback-action" href={action.href}>{action.label}</Link>
        ) : (
          <button className="ui-list-feedback-action" type="button" onClick={action.onClick}>{action.label}</button>
        )
      )}
    </div>
  );
}

export type ListSkeletonProps = {
  variant: "row" | "product" | "order";
  count?: number;
  label?: string;
  className?: string;
};

export function ListSkeleton({
  variant,
  count = 3,
  label = "Ładowanie listy…",
  className = "",
}: ListSkeletonProps) {
  const safeCount = Number.isSafeInteger(count) && count > 0 ? Math.min(count, 12) : 3;

  return (
    <div className={`ui-list-skeleton ui-list-skeleton-${variant} ${className}`} role="status">
      <span className="sr-only">{label}</span>
      <div className="ui-list-skeleton-items" aria-hidden="true">
        {Array.from({ length: safeCount }, (_, index) => (
          <div className="ui-list-skeleton-item" key={index}>
            <span className="ui-list-skeleton-image" />
            <span className="ui-list-skeleton-copy">
              <span className="ui-list-skeleton-line ui-list-skeleton-line-short" />
              <span className="ui-list-skeleton-line" />
              <span className="ui-list-skeleton-line ui-list-skeleton-line-medium" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export type ListView = "loading" | "error" | "empty" | "no-results" | "data";

export function resolveListView({
  itemCount,
  isLoading,
  hasError,
  hasActiveFilters,
}: {
  itemCount: number;
  isLoading: boolean;
  hasError: boolean;
  hasActiveFilters: boolean;
}): ListView {
  if (itemCount > 0) return "data";
  if (isLoading) return "loading";
  if (hasError) return "error";
  return hasActiveFilters ? "no-results" : "empty";
}

export type ListStateProps = {
  itemCount: number;
  isLoading: boolean;
  hasError: boolean;
  hasActiveFilters?: boolean;
  children: ReactNode;
  emptyState: ReactNode;
  noResultsState: ReactNode;
  errorState: ReactNode;
  loadingState: ReactNode;
  onRetry?: () => void;
  refreshingLabel?: string;
  refreshErrorLabel?: string;
  className?: string;
};

export function ListState({
  itemCount,
  isLoading,
  hasError,
  hasActiveFilters = false,
  children,
  emptyState,
  noResultsState,
  errorState,
  loadingState,
  onRetry,
  refreshingLabel = "Odświeżanie listy…",
  refreshErrorLabel = "Nie udało się odświeżyć listy. Pokazujemy poprzednie dane.",
  className = "",
}: ListStateProps) {
  const view = resolveListView({ itemCount, isLoading, hasError, hasActiveFilters });

  return (
    <div className={`ui-list-state ${className}`} data-view={view}>
      {view === "loading" && loadingState}
      {view === "error" && errorState}
      {view === "empty" && emptyState}
      {view === "no-results" && noResultsState}
      {view === "data" && (
        <>
          {isLoading && <p className="ui-list-refresh" role="status"><span className="ui-list-refresh-dot" aria-hidden="true" />{refreshingLabel}</p>}
          {hasError && !isLoading && (
            <div className="ui-list-refresh ui-list-refresh-error" role="alert">
              <span>{refreshErrorLabel}</span>
              {onRetry && <button type="button" onClick={onRetry}>Spróbuj ponownie</button>}
            </div>
          )}
          <div aria-busy={isLoading}>{children}</div>
        </>
      )}
    </div>
  );
}
