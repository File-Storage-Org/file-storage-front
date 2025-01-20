import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SearchBarSkeleton = () => {
  return (
    <div className="">
      <Skeleton className="h-8 w-[450px]" />
    </div>
  );
};

export default SearchBarSkeleton;
