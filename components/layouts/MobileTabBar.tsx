import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import {
  HiOutlineBell,
  HiOutlineHome,
  HiOutlinePencilSquare,
  HiOutlineUser,
} from "react-icons/hi2";

interface ITab {
  label: string;
  href?: string;
  icon: IconType;
  auth?: boolean;
  isAction?: boolean;
}

const MobileTabBar = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleNav = useCallback(
    (tab: ITab) => {
      if (tab.isAction) {
        if (!currentUser) return loginModal.onOpen();
        if (router.asPath !== "/") router.push("/");
        if (typeof window !== "undefined") window.scrollTo({ top: 0 });
        return;
      }
      if (tab.auth && !currentUser) return loginModal.onOpen();
      if (tab.href) router.push(tab.href);
    },
    [currentUser, loginModal, router]
  );

  const tabs: ITab[] = [
    { label: "Home", href: "/", icon: HiOutlineHome },
    { label: "Post", icon: HiOutlinePencilSquare, isAction: true },
    {
      label: "Alerts",
      href: "/notifications",
      icon: HiOutlineBell,
      auth: true,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: HiOutlineUser,
      auth: true,
    },
  ];

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-40 md:hidden
        glass border-t border-line
      "
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = tab.href ? router.asPath === tab.href : false;
          const isAction = tab.isAction;
          return (
            <li key={i} className="flex-1">
              <button
                onClick={() => handleNav(tab)}
                className={`
                  flex w-full flex-col items-center justify-center gap-0.5
                  rounded-2xl px-2 py-1.5
                  transition
                  ${isAction ? "" : "hover:bg-surface-subtle"}
                `}
                aria-label={tab.label}
              >
                <span
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl
                    ${
                      isAction
                        ? "bg-brand-700 text-white shadow-pop dark:bg-brand-600 dark:text-surface"
                        : isActive
                        ? "bg-brand-soft text-brand-700 dark:text-brand-500"
                        : "text-ink"
                    }
                  `}
                >
                  <Icon size={22} />
                </span>
                <span
                  className={`text-[10px] ${
                    isActive ? "text-brand-700 dark:text-brand-500 font-semibold" : "text-ink-soft"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileTabBar;
