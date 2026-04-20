import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar";

interface IUserHero {
  userId: string;
}

const UserHero: React.FC<IUserHero> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="relative h-44 bg-brand-gradient">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4 sm:left-6">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
