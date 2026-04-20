import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";
import { useRouter } from "next/router";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Avatar from "../Avatar";

const TRENDING = [
  { tag: "#design", posts: "12.4k" },
  { tag: "#ai", posts: "8.9k" },
  { tag: "#nextjs", posts: "4.2k" },
  { tag: "#productivity", posts: "3.1k" },
];

const FollowBar = () => {
  const router = useRouter();
  const { data: users = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();

  const suggestions = users
    .filter((u: any) => !currentUser || u.id !== currentUser.id)
    .slice(0, 5);

  return (
    <aside className="hidden lg:block sticky top-0 h-screen w-[320px] xl:w-[340px] shrink-0 overflow-y-auto px-5 py-5">
      <div className="flex flex-col gap-5">
        {/* Search */}
        <label className="relative block">
          <HiOutlineMagnifyingGlass
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
            size={18}
          />
          <input
            placeholder="Search Twittle"
            className="
              w-full rounded-full border border-line bg-surface
              py-2.5 pl-10 pr-4 text-[14px] text-ink
              placeholder-ink-faint outline-none transition
              focus:border-brand-400 focus:ring-4 focus:ring-brand-100/70
            "
          />
        </label>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <section className="rounded-3xl border border-line bg-surface p-4 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[15px] font-semibold text-ink">
                Suggested for you
              </h2>
              <button className="text-[12px] font-medium text-brand-700 hover:text-ink dark:text-brand-500 dark:hover:text-white">
                See all
              </button>
            </div>
            <ul className="mt-3 flex flex-col gap-3">
              {suggestions.map((user: Record<string, any>) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3"
                >
                  <button
                    onClick={() => router.push(`/users/${user.id}`)}
                    className="shrink-0"
                    aria-label={`Open ${user.name}'s profile`}
                  >
                    <Avatar userId={user.id} size="sm" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => router.push(`/users/${user.id}`)}
                      className="block max-w-full truncate text-left text-[14px] font-semibold text-ink hover:underline"
                    >
                      {user.name}
                    </button>
                    <p className="truncate text-[12px] text-ink-soft">
                      @{user.username}
                    </p>
                  </div>
                  <button
                    className="
                      shrink-0 rounded-full border border-line-strong
                      bg-surface px-3 py-1
                      text-[12px] font-semibold text-ink
                      transition hover:bg-ink hover:text-surface
                    "
                  >
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Trending */}
        <section className="rounded-3xl border border-line bg-surface p-4 shadow-card">
          <h2 className="font-display text-[15px] font-semibold text-ink">
            Trending today
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {TRENDING.map((t) => (
              <li key={t.tag} className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-ink">
                  {t.tag}
                </span>
                <span className="text-[12px] text-ink-soft">
                  {t.posts} posts
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="px-2 pb-6 text-[12px] text-ink-soft">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <a className="hover:text-ink" href="#">
              Terms
            </a>
            <a className="hover:text-ink" href="#">
              Privacy
            </a>
            <a className="hover:text-ink" href="#">
              Conduct
            </a>
            <a className="hover:text-ink" href="#">
              Help
            </a>
          </div>
          <p className="mt-2">© {new Date().getFullYear()} Twittle</p>
        </footer>
      </div>
    </aside>
  );
};

export default FollowBar;
