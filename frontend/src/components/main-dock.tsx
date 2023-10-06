import Image from "next/image";
import Link from "next/link";
import CreatePost from "@/components/create-post";

export default function MainDock() {
  return (
    <div className="fixed bottom-0 p-5  border-t w-full bg-white">
      <div className="flex justify-around">
        <CreatePost />
        <Link href={"/search"} passHref>
          <Image
            src="/icons/search.png"
            alt="Make a post icon"
            width={25}
            height={25}
          />
        </Link>
        <Image
          src="/icons/logout.png"
          alt="Search a user icon"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
}
