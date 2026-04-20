import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand-700 dark:text-brand-500">
          <HiOutlineBellAlert size={24} />
        </div>
        <h2 className="font-display text-lg font-semibold text-ink">
          You&apos;re all caught up
        </h2>
        <p className="max-w-xs text-[14px] text-ink-muted">
          New likes, replies, and follows will appear here.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {fetchedNotifications.map((n: Record<string, any>) => (
        <li
          key={n.id}
          className="flex items-start gap-3 border-b border-line px-4 py-4 sm:px-6"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-700 dark:text-brand-500">
            <HiOutlineBellAlert size={18} />
          </div>
          <p className="pt-1 text-[15px] leading-snug text-ink">{n.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default NotificationsFeed;
