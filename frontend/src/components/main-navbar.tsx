"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainNavbar() {
  const { back } = useRouter();
  return (
    <div className="w-full flex justify-around pt-6 pb-6 border-b">
      <Image
        width={40}
        height={40}
        src="/icons/return.png"
        alt="Go back icon"
        className="w-[12%] h-[12%] max-w-[60px]  mt-[5%] hover:cursor-pointer"
        onClick={() => back()}
      />

      <Image src="/icons/bee-icon.png" width={80} height={80} alt="Bee Icon" />
    </div>
  );
}
