import React from "react";

interface IButton {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<IButton> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition select-none disabled:cursor-not-allowed disabled:opacity-60";

  const sizing = large ? "px-6 py-3 text-[15px]" : "px-4 py-2 text-sm";
  const width = fullWidth ? "w-full" : "w-fit";

  let variant =
    "bg-brand-700 text-white shadow-pop hover:bg-brand-600 active:translate-y-px dark:bg-brand-600 dark:text-surface dark:hover:bg-brand-500";

  if (secondary) {
    variant =
      "bg-ink text-surface hover:bg-ink-muted";
  }
  if (outline) {
    variant =
      "bg-transparent text-ink border border-line-strong hover:bg-surface-subtle";
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizing} ${width} ${variant}`}
    >
      {label}
    </button>
  );
};

export default Button;
