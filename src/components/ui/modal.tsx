"use client";

import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/buttons";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";
    headingRef.current?.focus();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (!closeOnBackdrop || event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;

    if (outside) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={`ui-modal ${className}`}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        if (closeOnEscape) onClose();
      }}
      onClick={handleBackdropClick}
    >
      <div className="ui-modal-header">
        <div className="ui-modal-heading">
          <h2 ref={headingRef} id={titleId} tabIndex={-1} className="ui-modal-title">
            {title}
          </h2>
          {description && <p id={descriptionId} className="ui-modal-description">{description}</p>}
        </div>
        {showCloseButton && (
          <Button
            variant="ghost"
            size="sm"
            className="ui-modal-close"
            aria-label="Zamknij okno"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5 19 19M19 5 5 19" />
            </svg>
          </Button>
        )}
      </div>
      <div className="ui-modal-content">{children}</div>
      {actions && <div className="ui-modal-actions">{actions}</div>}
    </dialog>
  );
}
