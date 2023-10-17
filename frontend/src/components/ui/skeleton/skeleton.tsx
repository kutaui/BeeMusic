import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../card/card";

import React from "react";

function PostSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn(
        "animate-pulse rounded-md bg-muted max-w-[600px] mx-auto border-b-[1px] border-gray-300  ",
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row w-[80%] items-center ">
        <div className="h-12 w-12 rounded-full bg-gray-300" />
        <h2 className="w-14 h-3 ml-2 bg-gray-300 rounded" />
      </CardHeader>
      <CardContent className="h-[50%]">
        <div className="border flex  rounded-xl max-w-[600px] ">
          <div className="w-32 h-[100px] border rounded-l-xl bg-gray-300" />
          <div className="flex w-[80%] flex-col space-y-2 p-3 sm:text-2xl  sm:justify-center">
            <h2 className="w-16 h-3 ml-2 bg-gray-300 rounded" />
            <h3 className="w-32 h-3 ml-2 bg-gray-300 rounded" />
            <h4 className="w-14 h-3 ml-2 bg-gray-300 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CommentSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn(
        "animate-pulse rounded-md bg-muted border-b-[1px] border-gray-300",
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center w-[80%]">
        <div className="h-12 w-12 rounded-full bg-gray-300" />
        <h2 className="w-14 h-3 ml-2 bg-gray-300 rounded" />
      </CardHeader>
      <CardContent className="break-words space-y-2">
        <div className="w-52 h-4 bg-gray-300 rounded-full" />
        <div className="w-52 h-4 bg-gray-300 rounded-full" />
      </CardContent>
    </Card>
  );
}

export { PostSkeleton, CommentSkeleton };
