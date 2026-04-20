import { ISideBarItem } from "@/interfaces/sidebar.interface";
import React from "react";
import { HiOutlineHome, HiOutlineBell, HiOutlineUser } from "react-icons/hi2";
import { HiOutlineSparkles } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";
import ThemeToggle from "../ThemeToggle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items: ISideBarItem[] = [
    { label: "Home", href: "/", icon: HiOutlineHome },
    {
      label: "Notifications",
      href: "/notifications",
      icon: HiOutlineBell,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: HiOutlineUser,
      auth: true,
    },
  ];

  return (
    <aside
      className="
        hidden md:flex
        sticky top-0 h-screen
        w-[84px] xl:w-[260px]
        shrink-0
        flex-col justify-between
        px-3 xl:px-5 py-5
      "
    >
      <div className="flex flex-col gap-1">
        <SidebarLogo />
        <nav className="mt-6 flex flex-col gap-1">
          {items.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </nav>
        <div className="mt-4">
          <SidebarTweetButton />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="hidden xl:flex items-center gap-2 rounded-2xl border border-line bg-brand-soft px-3 py-3">
          <HiOutlineSparkles className="text-brand-700 shrink-0 dark:text-brand-500" size={20} />
          <p className="text-[13px] leading-snug text-ink-muted">
            Welcome to Twittle — a calmer place to share what&apos;s on your
            mind.
          </p>
        </div>
        <div className="mt-3 hidden md:flex xl:hidden">
          <ThemeToggle />
        </div>
        {currentUser && (
          <SidebarItem
            onClick={() => signOut()}
            icon={BiLogOut}
            label="Log out"
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
