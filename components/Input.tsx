import React from "react";

interface IInput {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInput> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className="
        w-full rounded-2xl border border-line bg-surface
        px-4 py-3 text-[15px] text-ink placeholder-ink-faint
        outline-none transition
        focus:border-brand-400 focus:ring-4 focus:ring-brand-100/70
        disabled:bg-surface-subtle disabled:opacity-70
      "
    />
  );
};

export default Input;
