import React from "react";
import { Skeleton } from "./ui/skeleton";

const AvatarSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton className="h-10 w-10 rounded-full bg-zinc-500" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px] bg-zinc-500" />
      </div>
    </div>
  );
};

export default AvatarSkeleton;
