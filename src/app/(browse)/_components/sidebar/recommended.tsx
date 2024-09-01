"use client";

import { User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";

type RecommendedProps = {
  recommendedUsers: User[];
};

export const Recommended = ({ recommendedUsers }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && recommendedUsers.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {recommendedUsers.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i}/>
      ))}
    </ul>
  )
}
