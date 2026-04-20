import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";
import useUser from "@/hooks/useUser";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import Button from "../Button";

interface IUserBio {
  userId: string;
}

const UserBio: React.FC<IUserBio> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();
  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(
    () =>
      fetchedUser?.createdAt
        ? format(new Date(fetchedUser.createdAt), "MMMM yyyy")
        : null,
    [fetchedUser?.createdAt]
  );

  return (
    <section className="border-b border-line pb-6">
      <div className="flex justify-end px-4 py-3 sm:px-6">
        {currentUser?.id === userId ? (
          <Button label="Edit profile" outline onClick={() => editModal.onOpen()} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Following" : "Follow"}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-10 px-4 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-ink">
          {fetchedUser?.name}
        </h1>
        <p className="text-[14px] text-ink-soft">@{fetchedUser?.username}</p>

        {fetchedUser?.bio && (
          <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
            {fetchedUser.bio}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 text-[14px] text-ink-soft">
          <HiOutlineCalendarDays size={18} />
          <span>Joined {createdAt}</span>
        </div>

        <div className="mt-4 flex items-center gap-6 text-[14px]">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-ink">
              {fetchedUser?.followingIds?.length || 0}
            </span>
            <span className="text-ink-soft">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-ink">
              {fetchedUser?.followersCount || 0}
            </span>
            <span className="text-ink-soft">Followers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserBio;
