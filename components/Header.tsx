import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import Logo from "./Logo";

interface IHeader {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<IHeader> = ({ label, showBackArrow }) => {
  const router = useRouter();
  const handleBack = useCallback(() => router.back(), [router]);

  return (
    <header className="sticky top-0 z-30 glass border-b border-line">
      <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {showBackArrow ? (
            <button
              onClick={handleBack}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-surface-subtle"
              aria-label="Back"
            >
              <HiArrowLeft size={18} />
            </button>
          ) : (
            <span className="md:hidden">
              <Logo size={28} />
            </span>
          )}
          <h1 className="truncate font-display text-[17px] font-semibold text-ink">
            {label}
          </h1>
        </div>
        <span className="hidden text-xs uppercase tracking-wider text-ink-soft md:inline">
          twittle
        </span>
      </div>
    </header>
  );
};

export default Header;
