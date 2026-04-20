import { useRouter } from "next/router";
import React from "react";
import Logo from "../Logo";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="flex items-center gap-2 rounded-2xl px-2 py-2 transition hover:bg-surface-subtle"
      aria-label="Twittle home"
    >
      <Logo size={34} />
      <span className="hidden xl:block font-display text-[22px] font-extrabold tracking-tight text-ink">
        twittle
      </span>
    </button>
  );
};

export default SidebarLogo;
