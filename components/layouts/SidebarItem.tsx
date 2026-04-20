import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { ISideBarItem } from "@/interfaces/sidebar.interface";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const SidebarItem: React.FC<ISideBarItem> = ({
  href,
  icon: Icon,
  label,
  onClick,
  auth = false,
  alert,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const isActive = href ? router.asPath === href : false;

  const handleClick = useCallback(() => {
    if (onClick) return onClick();
    if (auth && !currentUser) return loginModal.onOpen();
    if (href) router.push(href);
  }, [onClick, auth, currentUser, loginModal, href, router]);

  return (
    <button
      onClick={handleClick}
      className={`
        group relative flex items-center gap-3
        rounded-2xl px-3 py-3
        transition
        hover:bg-surface-subtle
        ${isActive ? "bg-brand-soft" : ""}
      `}
    >
      <span className="relative flex h-10 w-10 items-center justify-center">
        <Icon
          size={24}
          className={`transition ${
            isActive ? "text-brand-700 dark:text-brand-500" : "text-ink group-hover:text-ink"
          }`}
        />
        {alert && (
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-accent-rose ring-2 ring-surface" />
        )}
      </span>
      <span
        className={`
          hidden xl:inline-block text-[15px]
          ${isActive ? "font-semibold text-brand-700 dark:text-brand-500" : "font-medium text-ink"}
        `}
      >
        {label}
      </span>
    </button>
  );
};

export default SidebarItem;
