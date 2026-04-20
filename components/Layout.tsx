import React from "react";
import FollowBar from "./layouts/FollowBar";
import MobileTabBar from "./layouts/MobileTabBar";
import Sidebar from "./layouts/Sidebar";
import ThemeToggle from "./ThemeToggle";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface-muted text-ink">
      <div className="mx-auto flex w-full max-w-[1280px]">
        <Sidebar />
        <main
          className="
            min-h-screen w-full min-w-0 flex-1
            border-x border-line bg-surface
            pb-24 md:pb-0
          "
        >
          <div className="mx-auto w-full max-w-[680px]">{children}</div>
        </main>
        <FollowBar />
      </div>
      <div className="fixed bottom-24 right-4 z-40 md:bottom-5 md:right-5 lg:right-[calc((100vw-1280px)/2+1.5rem)]">
        <ThemeToggle />
      </div>
      <MobileTabBar />
    </div>
  );
};

export default Layout;
