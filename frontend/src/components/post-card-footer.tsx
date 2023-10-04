import Image from "next/image";

export default function PostCardFooter() {
  return (
    <div className="flex justify-around w-full items-center">
      <Image
        src="/icons/heart.png"
        width={25}
        height="25"
        alt="Like Icon"
        className="h-6 w-auto"
      />
      <Image
        src="/icons/comment.png"
        width={25}
        height={25}
        alt="Comment Icon"
      />
    </div>
  );
}
