import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { HiHeart } from "react-icons/hi";
import Avatar from "../Avatar";

interface IPostItem {
  data: Record<string, any>;
  userId?: string;
}

const formatCount = (n: number) => {
  if (!n) return "";
  if (n < 1000) return String(n);
  if (n < 1_000_000) return (n / 1000).toFixed(n < 10_000 ? 1 : 0) + "k";
  return (n / 1_000_000).toFixed(1) + "m";
};

const PostItem: React.FC<IPostItem> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!currentUser) return loginModal.onOpen();
      toggleLike();
    },
    [currentUser, loginModal, toggleLike]
  );

  const createdAt = useMemo(
    () =>
      data?.createdAt
        ? formatDistanceToNowStrict(new Date(data.createdAt))
        : null,
    [data?.createdAt]
  );

  const likeCount = data.likedIds?.length || 0;
  const commentCount = data.comments?.length || 0;

  return (
    <article
      onClick={goToPost}
      className="
        group relative cursor-pointer border-b border-line
        px-4 py-4 sm:px-6
        transition hover:bg-surface-muted
      "
    >
      <div className="flex items-start gap-3">
        <Avatar userId={data.user.id} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[14px]">
            <button
              onClick={goToUser}
              className="truncate font-semibold text-ink hover:underline"
            >
              {data.user.name}
            </button>
            <button
              onClick={goToUser}
              className="hidden truncate text-ink-soft hover:underline sm:inline"
            >
              @{data.user.username}
            </button>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-soft">{createdAt}</span>
          </div>

          <p className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-ink">
            {data.body}
          </p>

          <div className="mt-3 flex items-center gap-1 text-ink-soft">
            <ActionButton
              label={formatCount(commentCount)}
              hoverTone="brand"
              icon={<HiOutlineChatBubbleOvalLeft size={18} />}
            />
            <ActionButton
              hoverTone="mint"
              icon={<HiOutlineArrowPathRoundedSquare size={18} />}
            />
            <ActionButton
              onClick={onLike}
              label={formatCount(likeCount)}
              hoverTone="rose"
              active={hasLiked}
              icon={
                hasLiked ? (
                  <HiHeart size={18} className="text-accent-rose" />
                ) : (
                  <HiOutlineHeart size={18} />
                )
              }
            />
            <ActionButton
              hoverTone="brand"
              icon={<HiOutlinePaperAirplane size={18} />}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

interface IActionButton {
  icon: React.ReactNode;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  hoverTone?: "brand" | "rose" | "mint";
  active?: boolean;
}
const ActionButton: React.FC<IActionButton> = ({
  icon,
  label,
  onClick,
  hoverTone = "brand",
  active,
}) => {
  const toneHoverBg =
    hoverTone === "rose"
      ? "hover:bg-accent-rose/10 hover:text-accent-rose"
      : hoverTone === "mint"
      ? "hover:bg-accent-mint/10 hover:text-accent-mint"
      : "hover:bg-brand-soft hover:text-brand-700 dark:hover:text-brand-500";

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 rounded-full px-2.5 py-1.5
        text-[13px] font-medium transition
        ${toneHoverBg}
        ${active ? "text-accent-rose" : ""}
      `}
    >
      {icon}
      {label ? <span className="tabular-nums">{label}</span> : null}
    </button>
  );
};

export default PostItem;
