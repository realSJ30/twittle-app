import useTheme from "@/hooks/useTheme";
import React from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

const ThemeToggle = () => {
  const { theme, mounted, toggleTheme } = useTheme();

  if (!mounted) {
    return (
      <span className="inline-flex h-11 w-11 rounded-2xl border border-line bg-surface-subtle" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        inline-flex h-11 w-11 items-center justify-center
        rounded-2xl border border-line bg-surface
        text-ink shadow-card transition
        hover:bg-surface-subtle
      "
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <HiSun size={19} /> : <HiMoon size={19} />}
    </button>
  );
};

export default ThemeToggle;
