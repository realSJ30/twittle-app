import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface ICommentItem {
  data: Record<string, any>;
}

const CommentItem: React.FC<ICommentItem> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const createdAt = useMemo(
    () =>
      data?.createdAt
        ? formatDistanceToNowStrict(new Date(data.createdAt))
        : null,
    [data?.createdAt]
  );

  return (
    <div className="border-b border-line px-4 py-4 sm:px-6 transition hover:bg-surface-muted">
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
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
