import React, { useCallback } from "react";
import { HiXMark } from "react-icons/hi2";
import Button from "./Button";

interface IModal {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<IModal> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-ink/45 p-0 sm:p-6
        animate-fade-in
      "
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative flex h-full w-full flex-col bg-surface
          sm:h-auto sm:max-w-[520px]
          sm:rounded-3xl sm:shadow-float
        "
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="font-display text-[18px] font-semibold text-ink">
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="rounded-full p-1.5 text-ink-soft transition hover:bg-surface-subtle hover:text-ink"
            aria-label="Close"
          >
            <HiXMark size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">{body}</div>

        <div className="flex flex-col gap-3 border-t border-line px-6 py-5">
          <Button
            disabled={disabled}
            label={actionLabel}
            fullWidth
            large
            onClick={handleSubmit}
          />
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
