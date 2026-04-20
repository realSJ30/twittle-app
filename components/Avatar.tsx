import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface IAvatar {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZE_MAP = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
  xl: "h-32 w-32",
};

const Avatar: React.FC<IAvatar> = ({ userId, isLarge, hasBorder, size }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const resolvedSize = size ?? (isLarge ? "xl" : "md");

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      router.push(`/users/${userId}`);
    },
    [router, userId]
  );

  return (
    <div
      onClick={onClick}
      className={`
        relative shrink-0 overflow-hidden rounded-full
        bg-surface-subtle
        ${SIZE_MAP[resolvedSize]}
        ${hasBorder ? "ring-4 ring-surface" : ""}
        cursor-pointer transition hover:opacity-90
      `}
    >
      <Image
        fill
        sizes="128px"
        style={{ objectFit: "cover" }}
        alt="Avatar"
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
