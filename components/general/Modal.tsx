import type { ReactNode } from "react";
import { Button } from "./Button";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
};

export function Modal({
  open,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            {title ? (
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {title}
              </h2>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="mt-4">{children}</div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          {secondaryAction ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
            >
              {secondaryAction.label}
            </Button>
          ) : null}
          {primaryAction ? (
            <Button
              size="sm"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
            >
              {primaryAction.label}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

