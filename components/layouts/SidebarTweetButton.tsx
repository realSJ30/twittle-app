import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const onCompose = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    router.push("/");
    // Focus the composer on the home page; soft scroll-to-top.
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, [currentUser, loginModal, router]);

  return (
    <button
      onClick={onCompose}
      className="
        group mt-2 flex w-full items-center justify-center gap-2
        rounded-2xl bg-brand-700 dark:bg-brand-600
        px-4 py-3
        text-[15px] font-semibold text-white dark:text-surface
        shadow-pop transition
        hover:bg-brand-600 dark:hover:bg-brand-500 active:translate-y-px
      "
    >
      <HiOutlinePencilSquare size={20} className="shrink-0" />
      <span className="hidden xl:inline">New post</span>
    </button>
  );
};

export default SidebarTweetButton;
