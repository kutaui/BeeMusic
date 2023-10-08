import React from "react";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full flex justify-around justify-items-center pt-6 pb-6 border-b [&>*]:sm:w-[60px] [&>*]:all:w-[75px] [&>*]:sm:h-[60px] [&>*]:all:h-[75px] ">
        <Button variant="round" className="" asChild>
          <Link passHref href="/">
            Home
          </Link>
        </Button>
      </div>
      <section>{children}</section>
    </>
  );
}
